# webperf-ecommerce-id

Web Perf Comparison for E-Commerce in Indonesia

[![Audit web perf](https://github.com/mazipan/webperf-ecommerce-id/workflows/Audit%20web%20perf/badge.svg?branch=master)](https://github.com/mazipan/webperf-ecommerce-id/actions)

## List of E-commerce tested

| Name      | Desktop URL                | Mobile URL                         |
| --------- | -------------------------- | ---------------------------------- |
| Tokopedia | https://www.tokopedia.com/ | https://m.tokopedia.com/           |
| Shopee    | https://shopee.co.id/      | https://shopee.co.id/?d=mobile     |
| Bukalapak | https://www.bukalapak.com/ | https://m.bukalapak.com/           |
| Lazada    | https://www.lazada.co.id/  | https://www.lazada.co.id/?d=mobile |
| Blibli    | https://www.blibli.com/    | https://www.blibli.com/?d=mobile   |
| JD        | https://www.jd.id/         | https://m.jd.id/                   |
| Blanja    | https://www.blanja.com/    | https://m.blanja.com/              |

See details in file [src/server/ecommerce.ts](https://github.com/mazipan/webperf-ecommerce-id/blob/master/src/cronjob/ecommerce.ts)

## Schedule

Once a week

## Quantile

Running Lighthouse 5 times then get from quantile 75

## Engine

Using [PageSpeed Insight API](https://developers.google.com/speed/docs/insights/v5/get-started)

## Result

- On directory [/reports/output.json](https://github.com/mazipan/webperf-ecommerce-id/blob/master/reports/output.json)
- On [gist file](https://gist.github.com/mazipan/feebc7a0662d2450317b0926c1fbd918)

---

Copyright © 2020 by Irfan Maulana
