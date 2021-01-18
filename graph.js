airports = "BRA GRU CGH AJU FLN JOI LDB XAP".split(" ");
routes = [
  ["BRA", "GRU"],
  ["BRA", "AJU"],
  ["XAP", "LDB"],
  ["FLN", "AJU"],
  ["CGH", "GRU"],
  ["JOI", "AJU"],
  ["JOI", "AJU"],
  ["CGH", "GRU"],
];

let adjencyList = new Map();

function addNode(airport) {
  adjencyList.set(airport, []);
}

function addEdge(origin, destination) {
  adjencyList.get(origin).push(destination);
  adjencyList.get(destination).push(origin);
}

airports.forEach(addNode);

routes.forEach(function (route) {
  return addEdge.apply(void 0, route);
});
console.log(adjencyList);

function bfs(start) {
  var visited = new Set();
  var queue = [start];
  while (queue.length > 0) {
    var airport = queue.shift();
    var destinations = adjencyList.get(airport);
    for (var i = 0; i < destinations.length; i++) {
      destination = destinations[i];
      queue.push(destination);
      if (destination === "AJU") {
        console.log(destination);
      }
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
}
bfs("JOI");
