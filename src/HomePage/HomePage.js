import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage() {
  useEffect(() => {
    getBudget();
  }, []);
  
  const dataSource = {
    datasets: [{
      data: [],
      backgroundColor: [
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
        '#4bc0c0',
        '#9966ff',
        '#c9cbcf'
      ]
    }],
    labels: []
  };
  
  function createChart() {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: 'pie',
      data: dataSource
    });
  }
  
  function createD3Chart(data) {
    d3.select("#d3-chart").html("");
  
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const svg = d3.select("#d3-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const pie = d3.pie()
      .sort(null)
      .value(d => d.budget);
  
    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);
  
    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);
  
    const pieData = pie(data);
  
    const slice = svg.selectAll("g.slice")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "slice");
  
    slice.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.title))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  
    const text = slice.append("text")
      .attr("transform", d => {
        const pos = arc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.6 * Math.cos(midAngle - Math.PI / 2);
        pos[1] = radius * 0.6 * Math.sin(midAngle - Math.PI / 2);
        return `translate(${pos})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.title);
  
    const polyline = slice.append("polyline")
      .attr("points", d => {
        const pos = arc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const x = radius * 0.8 * Math.cos(midAngle - Math.PI / 2);
        const y = radius * 0.8 * Math.sin(midAngle - Math.PI / 2);
        return [arc.centroid(d), [x, y]];
      })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1px");
  }
  
  function getBudget() {
    fetch('http://localhost:3000/budget')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const budgetData = data.myBudget;
  
        dataSource.datasets[0].data = budgetData.map(item => item.budget);
        dataSource.labels = budgetData.map(item => item.title);
  
        createChart();
        createD3Chart(budgetData);
      })
      /*.catch((error) => {
        console.error("Error fetching budget data:", error);
      });*/
  }
  
  return (
<main class="center" id='main'>
        <section class="page-area">
            <div class="text-box" aria-labelledby="stay-track-heading">
                <h1 id="stay-track-heading">Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>

            <div class="text-box" aria-labelledby="alerts-heading">

                <h1 id="alerts-heading">Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>

            <div class="text-box" aria-labelledby="results-heading">

                <h1 id="results-heading">Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they live happier lives... since they expend without guilt or fear...
                    because they know it is all good and accounted for.
                </p>
            </div>

            <div class="text-box" aria-labelledby="free-heading">
                <h1 id="free-heading">Free</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </div>

            <div class="text-box" aria-labelledby="d3-chart-heading">
                <h1 id="d3-chart-heading">D3.js Budget Visualization</h1>
                <div id="d3-chart"></div>
            </div>

        </section>
    </main>
  );
}

export default HomePage;