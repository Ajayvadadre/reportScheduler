import express from 'express';
import { getReportStatus, saveSchedulerConfig } from '../controllers/scheduler.js'
let router = express.Router();

router.get('/status', async (req, res) => {
    try {
        let reportData = await getReportStatus();
        if (!reportData) {
            res.status(404).json({
                status: false,
                message: 'No data found'
            });
            return
        };

        res.status(200).json({
            status: true,
            message: reportData
        });

    } catch (error) {

        console.log('error ::: Unable to fetch reportStatus :::', error);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch report status'
        })
    }
});

router.post('/saveSchedulerConfig', async (req, res) => {

    if (!req.body.data) {
        res.status(400).json({
            status: false,
            message: 'Bad parameters supplied, please provide correct data'
        });
        return
    }

    const { id, name } = req.body.data;


    try {

       let saveStatus =  await saveSchedulerConfig(req.body);

       if(!saveStatus) {
        res.status(500).json({
            status: false,
            message: `Failed to schedule report for ::: ${name}`
        })
       }

        res.status(200).json({
            status: true,
            message: 'Report scheduled successfully'
        })

    } catch (error) {

        console.log('error ::: Unable to schedule report for id :::', name);
        res.status(500).json({
            status: false,
            message: `Failed to schedule report for id:::${name}`
        })
    }
});

export default router;