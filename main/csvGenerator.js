import csvGenerator from 'csv-writer';
import reportDataSchema from '../schemas/reportDataSchema';

async function csvGenerator(date) {

    try {
        const startDate = date.startDate
        const endDate = date.endDate

        let csvData = reportDataSchema.find({ date: { $gte: startDate, $lte: endDate } });
    } catch (error) {

    }
}

export {
    csvGenerator
}