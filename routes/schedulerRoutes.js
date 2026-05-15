import express from 'express';
import { getReportStatus, scheduleReport } from '../controllers/scheduler'
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

    const id = req.body.id;

    if (!id) {
        res.status(400).json({
            status: false,
            message: 'Bad parameters supplied, please provide correct Id'
        });
        return
    }

    try {

        await saveSchedulerConfig(id);

        res.status(200).json({
            status: true,
            message: 'Report scheduled successfully'
        })

    } catch (error) {

        console.log('error ::: Unable to schedule report for id :::', id);
        res.status(500).json({
            status: false,
            message: `Failed to schedule report for id:::${id}`
        })
    }
});
