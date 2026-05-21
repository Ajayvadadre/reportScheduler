import cron from 'node-cron';

async function initReportSchedule(configData) {
    configData ={
        data:{
            time: '16:20',
            type: 'daily',
            id: 2081
        }
    }

    const cronRule = await buildCronRule(configData);
    
    if (!cronRule) {
        console.log('log::: Unable to create timer for cronRule');
        return;
    };

    const cronSchedule = await scheduleCron(cronRule, configData.data.id);

};

async function buildCronRule(configData) {
   
    const convertedTime =  await convertTime(configData);
    
    switch (configData.data.type) {

        case 'interval':
            return `*/${convertedTime} * * * *`

        case 'daily':
            return `${convertedTime[1]} ${convertedTime[0]} * * *`

        case 'oneTimeActivity':

            break;

        default:
            null;
            break;
    }
};

async function convertTime(configData) {

    const timeSet = configData.data.time
    switch (configData.data.type) {

        case 'interval':
            return configData.time;

        case 'daily':
            let time = timeSet.split(':');
           
            return time

        case 'oneTimeActivity':
            return
    }

}

async function scheduleCron(cronRule, id) {
    console.log("Inside scheduleeeeeeeeeeeeeeeee")

    try {

        cron.schedule(cronRule, () => {
            console.log("log::: Cron rule set for the config successfully");
            executeReport(id)
        });
        console.log(`Successfully registered cron job for ID ${id} with rule: ${cronRule}`);
    } catch (error) {
        console.error("error::: Error while scheduling cron",error);
        return
    }
};

function executeReport(id) {

};

initReportSchedule()

export { initReportSchedule };
