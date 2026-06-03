import { createObjectCsvWriter } from 'csv-writer';
import reportDataSchema from '../models/reportData.model.js';

async function csvGenerator(date) {

    try {
        const startDate = new Date(date.start);
        const endDate = new Date(date.end);

        const csvData = await reportDataSchema.find({ createdAt: { $gte: startDate, $lte: endDate } }).lean();

        if(csvData.length == 0){
            console.log("log::: No data found",csvData)
            return
        }

        const header = Object.keys(csvData[0]).map(key => ({
            id: key,
            title: key.toUpperCase()
        }));

        const csvDataWriter = await createObjectCsvWriter({
            path: './report/report.csv',
            header: header
        });

        await csvDataWriter.writeRecords(csvData);

        return './report/report.csv'

    } catch (error) {
        console.log("error::: error generating csv file:::", error);
        return null; 
    }
}
// csvGenerator();

export {
    csvGenerator
}