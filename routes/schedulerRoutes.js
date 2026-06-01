import express from 'express';
import { getReportStatus, saveSchedulerConfig, insertReportData } from '../controllers/scheduler.js'
let router = express.Router();

router.get('/status', async (req, res) => {
    try {
        let reportData = await getReportStatus();
        if (!reportData) {
            res.status(404).json({
                status: "failed",
                message: 'No data found'
            });
            return
        };

        res.status(200).json({
            status: "successfull",
            message: reportData
        });

    } catch (error) {

        console.log('error ::: Unable to fetch reportStatus :::', error);
        res.status(500).json({
            status: "failed",
            message: 'Failed to fetch report status'
        })
    }
});

router.post('/saveSchedulerConfig', async (req, res) => {

    if (!req.body.data) {
        res.status(400).json({
            status: "failed",
            message: 'Bad parameters supplied, please provide correct data'
        });
        return
    }

    const { id, name } = req.body.data;
    try {

        let saveStatus = await saveSchedulerConfig(req.body);

        if (!saveStatus) {
            res.status(500).json({
                status: "failed",
                message: `Failed to schedule report for ::: ${name}`
            })
        }

        res.status(200).json({
            status: "successfull",
            message: 'Report scheduled successfully'
        })

    } catch (error) {

        console.log('error ::: Unable to schedule report for id :::', name);
        res.status(500).json({
            status: "failed",
            message: `Failed to schedule report for id:::${name}`
        })
    }
});

router.post('/insertReportData', async (req, res) => {

    const data = req.body;
    console.log(data)
    if (!data) {

        console.log("No data to insert into DB");
        res.status(403).json({
            status: "failed",
            message: "No data to insert please send appropriate data"
        })
    }

    try {

        const insertData = await insertReportData(data);
        console.log("Report data inserted successfully");

        res.status(200).json({
            status: "successfull",
            messge: "Report data inserted successfully"
        });

    } catch (error) {

        console.log("error:::Unable to insert reportData:::", error);
        res.status(500).json({
            status: "failed",
            message: `Unable to insert report data`
        })
    }
})

export default router;