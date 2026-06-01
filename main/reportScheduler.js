import cron from 'node-cron';
import { csvGenerator } from './csvGenerator';
import schedulerConfigSchema from '../schemas/schedulerConfigSchema';
import reportStatusSchema from '../schemas/reportStatusSchema';

async function initReportSchedule(configData) {

    const cronRule = await buildCronRule(configData);

    if (!cronRule) {
        console.log('log::: Unable to create timer for cronRule');
        return false;
    };

    const cronSchedule = await scheduleCron(cronRule, configData.data);
    if (!cronSchedule) {
        return false;
    };
    return true;

};

async function buildCronRule(configData) {

    const convertedTime = await convertTime(configData);

    switch (configData.data.type) {

        case 'interval':
            return `*/${convertedTime} * * * *`

        case 'daily':
            return `${convertedTime[1]} ${convertedTime[0]} * * *`

        default:
            null;
            break;
    }
};

async function convertTime(configData) {

    const timeSet = configData.data.time;

    switch (configData.data.type) {

        case 'interval':
            return configData.time;

        case 'daily':
            let time = timeSet.split(':');
            return time

    }

}

async function scheduleCron(cronRule, configData) {

    try {

        cron.schedule(cronRule, () => {
            console.log("log::: Cron rule set for the config successfully");
            executeReport(configData)
        });

        console.log(`Successfully registered cron job for ID ${configData.id} with rule: ${cronRule}`);
        return true;

    } catch (error) {
        console.log("error::: Error while scheduling cron", error);
        return false
    }
};

async function executeReport(configData) {

    const { id, date } = configData.data
    const scheduleData = await schedulerConfigSchema.find({ id: id });

    if (scheduleData.length == 0) {
        console.log("log::: Unable to find config to generate the csv report", id);

        await reportStatusSchema.insert({
            status: "failed",
            message: "ReportGenerateFailure::: Unable to find config to generate csv report",
            name: configData.name
        });
        return;
    };

    try {
        generatedCsv = await csvGenerator(date);

    } catch (error) {
        console.log(`error::: csv generation failed for:::${configData.name}:::Error:::${error}`);
        await reportStatusSchema.insert({
            status: "failed",
            message: "ReportGenerateFailure::: Unable to generate csv",
            name: configData.name
        });
    }

};


export { initReportSchedule };
