const fs = require('fs').promises;

const readDatabaseSetting = async (filePath) =>
    {
        try
        {
            const data = await fs.readFile(filePath, 'utf8');

            // json parsing
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error)
        {
            console.log(`${error}`);
            return;
        }
    };
    
module.exports =
{
    readDatabaseSetting
};