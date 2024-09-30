import React from 'react'
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

function Hero() {
  return (
    <script>
        var dataSource = {
            datasets: [
                {
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
                }

                ],
                labels: [
                    'Eat out',
                    'Rent',
                    'Groceries'
                ]
            };

        function createChart(){
            var ctx = document.getElementById("myChart").getContext("2d");
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: dataSource
            });
        }

        function createChart(){
            var ctx = document.getElementById("myChart").getContext("2d");
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: dataSource
            });
        }

        function createD3Chart(data) {
            d3.select("#d3-chart").html("");

            const width = 500;
            const height = 500;
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

            // Pie slices
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

            // Labels
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

            // Add lines
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
        axios.get('/budget')
        .then(function (res) {
            console.log(res);
            const budgetData = res.data.myBudget;
            
            // Update Chart.js data
            dataSource.datasets[0].data = budgetData.map(item => item.budget);
            dataSource.labels = budgetData.map(item => item.title);
            
            createChart(); // This creates/updates the Chart.js chart
            createD3Chart(budgetData); // This creates the D3.js chart with external labels
        })
        .catch(function (error) {
            console.error("Error fetching budget data:", error);
        });
    }
        
        getBudget();
        //createChart();
    </script>
  );
}

export default Hero;