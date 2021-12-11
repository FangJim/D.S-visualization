var svg_width = 1300;
var svg_height = 400;
let dataset = [];
// for (let i = 0; i < 50; i++) {
//   dataset[i] = Math.floor(Math.random() * 70) + 10;
// }
dataset = [
  73, 49, 78, 47, 36, 23, 58, 20, 11, 27, 37, 33, 57, 68, 25, 56, 59, 38, 50,
  55, 61, 69, 72, 46, 17, 15, 74, 30, 79, 21, 43, 65, 32, 53, 45, 62, 26, 70,
  71, 51, 31, 52, 60, 75, 28, 42, 54, 41, 35, 29,
];

var svg = d3
  .select(".show")
  .append("svg")
  .attr("width", svg_width)
  .attr("height", svg_height);
svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "Rect")
  .attr("fill", "#09c")
  .attr("x", (d, i) => {
    return i * (svg_width / dataset.length);
  })
  .attr("y", (d) => {
    return svg_height - d * 4 - 22;
  })
  .attr("width", svg_width / dataset.length - 4)
  .attr("height", (d) => {
    return d * 4;
  });
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attr("fill", "#09c")
  .attr("font-size", "13px")
  .attr("x", (d, i) => {
    return i * (svg_width / dataset.length);
  })
  .attr("y", (d) => {
    return svg_height;
  });
