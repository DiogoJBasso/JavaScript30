airports = 'BRA GRU CGH AJU FLN JOI LDB XAP'.split(' ')
routes = [['BRA', 'GRU'],['BRA', 'AJU'], ['XAP', 'LDB'],['FLN', 'AJU'],['CGH', 'GRU'],['JOI', 'AJU'],['JOI', 'AJU'],['CGH', 'GRU']]
let adjencyList = new Map()
function addNode(airport){
  adjencyList.set(airport, [])
}
function addEdge(origin, destination){
  adjencyList.get(origin).push(destination)
  adjencyList.get(destination).push(origin)
}
airports.forEach(addNode)
routes.forEach(route => addEdge(...route))
console.log(adjencyList)

function bfs(start){
  const visited = new Set()
  const queue = [start]
  while (queue.length > 0){
    const airport = queue.shift()
    const destinations = adjencyList.get(airport)
    for (destination of destinations) {
      queue.push(destination)
      if(destination ==='AJU'){
        console.log(destination)
      }
      if(!visited.has(destination)){
        visited.add(destination)
        queue.push(destination)

      }
    }
  }
}
bfs('JOI')