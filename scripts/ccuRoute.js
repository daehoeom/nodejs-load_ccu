const express = require('express');
const ccuDB = require('./ccuDB');
const dbSetting = require('./databaseSetting');
const router = express.Router();

router.get('/getCCU', async (req, res) =>
{
    let res_get_ccu = 
    {
        status_code : 500,
        ccus: [],
    };

    let databaseSettings = await dbSetting.readDatabaseSetting('./database_settings.json');

    try
    {
        for (let i = 0; i < databaseSettings.length; ++i)
        {
            let setting = databaseSettings[i];
            const rows = await ccuDB.getRecentlyLog(setting.host, setting.database, setting.user, setting.password);
            res_get_ccu.status_code = 200;
            if (rows.length > 0)
            {
                rows.forEach((row) =>
                {
                    res_get_ccu.ccus.push
                    ({
                        world_id : row.world_id,
                        ccu : row.ccu,
                        ccu_assist : row.ccu_assist,
                        time : row.created_at,
                    });
                    console.log(`add world : ${row.world_id}`);
                });
            }
            else
            {
                console.log('not exist history');
            }
        }
    }
    catch (error)
    {
        console.log(`${error}`);
    }
    finally
    {
        var result = '';

        for (var i = 0; i < res_get_ccu.ccus.length; ++i)
        {
            result += `world_id : ${res_get_ccu.ccus[i].world_id}`;
            result += "<br>";
            result += `ccu : ${res_get_ccu.ccus[i].ccu}`;
            result += "<br>";
            result += `ccu_assist : ${res_get_ccu.ccus[i].ccu_assist}`;
            result += "<br>";
            result += `time : ${res_get_ccu.ccus[i]?.time}`;
            result += "<br>";
            result += "<br>";
        }

        res.send(result);
    }  
});

module.exports = router;