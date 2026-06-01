import { initReportSchedule } from '../main/reportScheduler.js';
import reportStatusSchema from '../schemas/reportStatusSchema.js';
import schedulerConfigSchema from '../schemas/schedulerConfigSchema.js';
import reportDataSchema from '../schemas/reportDataSchema.js';


async function getReportStatus() {

    let reportData = await reportStatusSchema.find({}).sort({ _id: -1 }).limit(50);

    if (reportData.length == 0) {
        console.log('log::: No reportData found');
        throw new Error('No reportData found')
    };

    return reportData;
};

async function saveSchedulerConfig(scheduleConfig) {

    //save config inside mongoDB
    await schedulerConfigSchema.insertOne(scheduleConfig.data);


    //Initialising cron job for config
    const reportStatus = await initReportSchedule(scheduleConfig);

    if (!reportStatus) {
        console.log('log::: Report schedule unsuccessfull :::', reportStatus)
        return false
    };

    return true;

}

async function insertReportData(data) {

    await reportDataSchema.insertOne(data);
    
}

export {
    getReportStatus,
    saveSchedulerConfig,
    insertReportData
}