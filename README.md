# webperf-ecommerce-id

Web Perf Comparison for E-Commerce in Indonesia

## List of E-commerce tested

| Name       | Desktop URL                 | Mobile URL                           |
|------------|-----------------------------|--------------------------------------|
|Tokopedia   |  https://www.tokopedia.com/ |  https://m.tokopedia.com/            |
|Shopee      |  https://shopee.co.id/      |  https://shopee.co.id/?d=mobile      |
|Bukalapak   |  https://www.bukalapak.com/ |  https://m.bukalapak.com/            |
|Lazada      |  https://www.lazada.co.id/  |  https://www.lazada.co.id/?d=mobile  |
|Blibli      |  https://www.blibli.com/    |  https://www.blibli.com/?d=mobile    |
|JD          |  https://www.jd.id/         |  https://m.jd.id/                    |
|Blanja      |  https://www.blanja.com/    |  https://m.blanja.com/               |

See details in file [src/server/ecommerce.ts](https://github.com/mazipan/webperf-ecommerce-id/blob/master/src/server/ecommerce.ts)

## Schedule

Once a week

## Percentile

Running Lighthouse 5 times then get the 75 percentile value

## Engine

Using [API for Lighthouse Bot](https://github.com/GoogleChromeLabs/lighthousebot#ci-backend-builder)
