const data = window.__data || {};
const dataKeys = Object.keys(data);
const categories = dataKeys || [];
const deviceMap = { desktop: 'd', mobile: 'm' };
const columns = ['tokopedia', 'lazada', 'shopee', 'bukalapak', 'blibli', 'jd', 'blanja'];
const colors = ['#03AC0E', '#00ffff', '#fc5930', '#d71149', '#0095da', '#b67fd6', '#ef8888'];

const getData = function(date, col) {
  return data[date].find(function(i) {
    return i.n === col;
  });
};

const getSeries = device => {
  const res = [];
  columns.forEach(col => {
    const dataSeries = [];
    categories.forEach(date => {
      const d = getData(date, col);
      if (d) {
        dataSeries.push(d[deviceMap[device]].r.perf);
      }
    });
    res.push({
      name: col,
      data: dataSeries,
    });
  });
  return res;
};

const optionsChartLine = (title, device) => ({
  title: {
    text: title,
    align: 'center',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#263238',
    },
  },
  chart: {
    height: 350,
    type: 'line',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  colors,
  series: getSeries(device),
  legend: {
    labels: {
      colors: '#333',
    },
  },
  xaxis: {
    type: 'category',
    categories,
    labels: {
      style: {
        colors: '#333',
      },
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        colors: ['#333'],
      },
    },
    crosshairs: {
      show: true,
      position: 'back',
      stroke: {
        color: '#333',
        width: 1,
        dashArray: 0,
      },
    },
  },
});

new ApexCharts(document.querySelector('#chartDesktop'), optionsChartLine('Perf Score Desktop', 'desktop')).render();
new ApexCharts(document.querySelector('#chartMobile'), optionsChartLine('Perf Score Mobile', 'mobile')).render();
