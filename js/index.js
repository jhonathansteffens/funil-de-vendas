const myFunnelChart = document.getElementById('myFunnelChart');

VISITANTES = 333;

const funnelChart = {
  id: 'funnelChart',
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data, chartArea: { top, left, bottom, right, width, height }, scales: { x, y } } = chart;

    ctx.save();
    for (let i = 0; i < chart.getDatasetMeta(0).data.length - 1; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(102, 102, 102, 1)';
      ctx.strokeStyle = 'rgba(102, 102, 102, 1)';
      ctx.moveTo(chart.getDatasetMeta(0).data[i].base, chart.getDatasetMeta(0).data[i].y +
        (chart.getDatasetMeta(0).data[i].height / 2));
      ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y +
        (chart.getDatasetMeta(0).data[i].height / 2));
      ctx.lineTo(chart.getDatasetMeta(0).data[i + 1].x, chart.getDatasetMeta(0).data[i + 1].y -
        (chart.getDatasetMeta(0).data[i + 1].height / 2));
      ctx.lineTo(chart.getDatasetMeta(0).data[i + 1].base, chart.getDatasetMeta(0).data[i + 1].y -
        (chart.getDatasetMeta(0).data[i + 1].height / 2));
      ctx.closePath();

      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    for (let j = 0; j < chart.getDatasetMeta(0).data.length; j++) {
      const datapointPercentage = data.datasets[0].data[j][1] - data.datasets[0].data[j][0];
      const quantity = VISITANTES * datapointPercentage / 100;
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';
      ctx.font = ' bold 10px sans-serif';
      ctx.fillStyle = 'rgba(102, 102, 102, 102)';
      ctx.fillText(`${quantity} (${datapointPercentage}%)`, (chart.getDatasetMeta(0).data[0].x - left) / 2 + left, chart.getDatasetMeta(0).data[j].y);
    }
  }

}

new Chart(myFunnelChart, {
  type: 'bar',
  data: {
    labels: ['Visitantes', 'Leads', 'Lead Qualificado', 'Clientes', 'Negócio Fechado'],
    datasets: [{
      label: 'Vendas Realizadas',
      data: [
        [0, 100],
        [20, 80],
        [30, 70],
        [40, 60],
        [45, 55],
      ],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2',
        'rgba(54, 162, 104, 0.2',
        'rgba(255, 206, 104, 0.2',
        'rgba(75, 192, 104, 0.2',
        'rgba(153, 102, 104, 0.2',
      ],
      borderWidth: 1,
      borderSkipped: false,
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false
      }
    }
  },
  plugins: [funnelChart]
});

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

