import { initReportSchedule } from '../services/reportScheduler.service.js';
import reportStatusSchema from '../models/reportStatus.model.js';
import schedulerConfigSchema from '../models/schedulerConfig.model.js';
import reportDataSchema from '../models/reportData.model.js';


async function getReportStatus() {

    let reportData = await reportStatusSchema.find({}).sort({ _id: -1 }).limit(50);

    if (reportData.length == 0) {
        console.log('log::: No reportData found');
        return;
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