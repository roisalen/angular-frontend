import Highcharts from 'highcharts';
import { StatisticsData } from './types';

export function createPieCharts(data: StatisticsData, containerIds: string[], typeLabel: string) {
  new Highcharts.Chart({
    chart: {
      renderTo: containerIds[0],
      type: 'pie'
    },
    title: {
      text: `Innlegg fordelt på ${typeLabel.toLowerCase()}`
    },
    series: [{
      type: 'pie',
      name: "Antall",
      data: data.idAndEntries
    }]
  });

  new Highcharts.Chart({
    chart: {
      renderTo: containerIds[1],
      type: 'pie'
    },
    title: {
      text: `Replikker fordelt på ${typeLabel.toLowerCase()}`
    },
    series: [{
      type: 'pie',
      name: "Antall",
      data: data.idAndReplies
    }]
  });
}

export function createColumnChart(data: StatisticsData, containerId: string, typeLabel: string) {
  new Highcharts.Chart({
    chart: {
      renderTo: containerId,
      type: 'column',
    },
    title: {
      text: `Innlegg og replikker fordelt på ${typeLabel.toLowerCase()}`
    },
    xAxis: {
      categories: data.ids,
      title: {
        text: typeLabel
      }
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Antall'
      }
    },
    series: [{
      type: 'column',
      name: 'Innlegg',
      data: data.entries,
    }, {
      type: 'column',
      name: 'Replikker',
      data: data.replies,
    }]
  });
} 