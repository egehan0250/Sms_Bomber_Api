const { glob } = require("glob");
const { promisify } = require("util");
global.globPromise = promisify(glob);
global.request = require('request');
global.axios = require('axios');
global.faker = require('faker');
global.dayjs = require('dayjs');
global.fs = require('fs');
global.expres = require('express');
const app = expres();
global.port = 4040;
global.chalk = require('chalk');
const { smsBomber } = require('./functions/sms');

app.use(expres.json());

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "API is working."
    });
});

app.get('/api/v1/sms', async (req, res) => {
    try {
        const { phone, amount } = req.query;
        if (!phone) return res.json({ status: false, message: "Lütfen bir telefon numarası giriniz." });
        if (!amount) return res.json({ status: false, message: "Lütfen bir miktar giriniz." });
        if (phone.length !== 10) return res.json({ status: false, message: "Telefon numarası 10 haneli olmalıdır." });
        if (isNaN(phone)) return res.json({ status: false, message: "Telefon numarası sadece sayılardan oluşmalıdır." });
        if (isNaN(amount)) return res.json({ status: false, message: "Miktar sadece sayılardan oluşmalıdır." });
        if (amount > 100) return res.json({ status: false, message: "Miktar 100'den fazla olamaz." });
        if (amount < 1) return res.json({ status: false, message: "Miktar 1'den az olamaz." });
        const smsBoom = await smsBomber({ phone, amount });
        if (smsBoom.status == false) return res.json({ status: false, message: 'SMS gönderilirken bir hata oluştu.' });
        res.json({ status: true, message: `Toplamda ${smsBoom.dataSb.total} adet sms gönderildi. (${smsBoom.dataSb.success} başarılı, ${smsBoom.dataSb.error} hatalı)` });
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: "Bir hata oluştu." });
    }
});

app.listen(port, () => {
    console.log(chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] > `) + chalk.greenBright("[SYSTEM] | [express]") + chalk.blueBright(` localhost:${port}`) + chalk.greenBright(" ile bağlantı kuruldu."));
});