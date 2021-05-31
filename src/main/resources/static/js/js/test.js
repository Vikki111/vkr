let graph;

let atlasTimeout;

let edgeLabels = {};

let selectedEdgeId;

function processData(test) {

  if(graph.isForceAtlas2Running())
    graph.killForceAtlas2();

  if(atlasTimeout)
    clearTimeout(atlasTimeout);

  const data = {};

  $('#input').val().split('\n').forEach(function(line){
    if(line.includes(':'))
      data[line.split(':')[0].trim()] = line.split(':')[1].split(',').map(x => x.trim()).filter(x => x);
  });

  const dataKeys = Object.keys(data);
  const tags = [];

  const graphData = {
    nodes:[],
    edges:[]
  };

  dataKeys.forEach(function(key){
    graphData.nodes.push({
      id: key,
      label: key,
      size: 5,
      color: '#00838F',
      x:Math.random(),
      y:Math.random(),
    });
    data[key].forEach(function(tag){
      if(!tags.includes(tag)){
        graphData.nodes.push({
          id: 'tag'+tag,
          label: tag,
          size: 8,
          color: '#00695C',
          x:Math.random(),
          y:Math.random()
        });
        tags.push(tag);
      }
      graphData.edges.push({
        id: key+tag,
        source: key,
        size: 12,
        target: 'tag'+tag,
        color: '#ccc',
        hover_color: '#000'
      });
    });
  });

if(edgeLabels != null ) {
    console.log('!!!!!');
    graphData.edges.forEach(function(edge){
        if(edgeLabels[edge.id] != null) {
            edge.label = edgeLabels[edge.id];
        }
    });
}


  graph.graph.clear().read(graphData);

//  graph.settings({
//    edgeColor: 'default',
//    defaultEdgeColor: '#9E9E9E',
//    labelThreshold:0
//  });

  graph.camera.goTo({
    x:0,
    y:0,
    ratio:1.1,
    angle:0
  });

  if(dataKeys.length){
    graph.startForceAtlas2({
      iterationsPerRender:1000,
      outboundAttractionDistribution:true
    });

    atlasTimeout = setTimeout(function(){
      graph.killForceAtlas2();
    }, 5000);
  }else{
    graph.refresh();
  }
}



$(document).ready(function(){
alarm("!!!!!!!");

graph = new sigma({
  renderer: {
    container: document.getElementById('graph-container'),
    type: 'canvas'
  },
  settings: {
    doubleClickEnabled: false,
    minEdgeSize: 0.5,
    maxEdgeSize: 4,
    enableEdgeHovering: true,
    edgeHoverColor: 'edge',
    defaultEdgeHoverColor: '#000',
    edgeHoverSizeRatio: 1,
    edgeHoverExtremities: true
  }
});

graph.bind('doubleClickEdge', function(e) {
  console.log(e.data.edge.id);
    processData(e.data.edge.id);
});

//  graph = new sigma('container');
  processData();

  let timeout;
  $('#input').on('input', function(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      processData();
    }, 500);
  });

  graph.bind('doubleClickEdge', function(e) {
    console.log(e.data.edge.id);
    selectedEdgeId = e.data.edge.id;
  });

$("input[type=button]").click(function() {
   console.log($('#inputEdge').val());
   edgeLabels[selectedEdgeId] = $('#inputEdge').val();
   console.log(Object.keys(edgeLabels));
   console.log(Object.values(edgeLabels));
});

});

