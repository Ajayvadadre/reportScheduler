import { createObjectCsvWriter } from 'csv-writer';
import reportDataSchema from '../schemas/reportDataSchema.js';

async function csvGenerator(date) {

    try {
        const startDate = "2026-06-01"
        const endDate = "2026-06-01"

        const csvData = await reportDataSchema.find({ date: { $gte: startDate, $lte: endDate } });

        const header = Object.keys(csvData[0]).map(key => ({
            id: key,
            name: key.toUpperCase()
        }));

        const csvDataWriter = await createObjectCsvWriter({
            path: './report/report.csv',
            headers: header
        });

        await csvDataWriter.writeRecords(csvData)
        return './report/report.csv'

    } catch (error) {
        console.log("error::: error generating csv file:::", error);
        return null;
    }
}
csvGenerator()

export {
    csvGenerator
}