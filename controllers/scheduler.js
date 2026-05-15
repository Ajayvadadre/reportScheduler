import MongoConnection from '../connection/mongoConnection'
import { initReportSchedule } from '../main/reportScheduler';

const db = MongoConnection.getDb();
async function getReportStatus() {

    let collection = db.collection('reportStatus');

    let reportData = await collection.find({}).sort({ _id: -1 }).limit(50).toArray();

    if (reportData.length == 0) {
        console.log('log ::: No reportData found');
        throw new Error('No reportData found')
    };

    return reportData;
};

async function saveSchedulerConfig(scheduleConfig) {

    //save config inside mongoDB
    let collection = db.collection('schedulerConfig');
    await collection.insertOne(scheduleConfig);

    
    //Initialising cron job for config
    const reportStatus = await initReportSchedule(scheduleConfig)
}


export {
    getReportStatus,
    saveSchedulerConfig
}