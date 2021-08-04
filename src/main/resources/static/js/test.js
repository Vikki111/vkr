let graph;

let atlasTimeout;

let edgeLabels = {};

let greenNodeIds = {};

let redNodeIds = {};

let selectedEdgeId;

var nId = 0;

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
  const tagIds = [];

  const graphData = {
    nodes:[],
    edges:[]
  };

  dataKeys.forEach(function(key){       //добавление вершин слева
    if(!tagIds.includes(key)){            //если их не было еще
        graphData.nodes.push({
          id: key,
          label: key,
          size: 10,
          color: '#00838F',
          x:Math.random(),
          y:Math.random(),
        });
        tagIds.push(key);
    }
    data[key].forEach(function(tag){       //добавление вершин справа
      if(!tagIds.includes(tag)){             //если их не было еще
        graphData.nodes.push({
          id: tag,
          label: tag,
          size: 10,
          color: '#00695C',
          x:Math.random(),
          y:Math.random()
        });
        tagIds.push(tag);
      }
      if(key === tag) {
          graphData.edges.push({ //добавление связей
          id: key+tag,
          source: key,
          size: 12,
          target: tag,
          color: '#ccc',
          hover_color: '#000',
          type: 'curve'
        });
      } else {
          graphData.edges.push({ //добавление связей
          id: key+tag,
          source: key,
          size: 12,
          target: tag,
          color: '#ccc',
          hover_color: '#000'
        });
      }
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


//  graph.graph.clear().read(graphData);

//  graph.settings({
//    edgeColor: 'default',
//    defaultEdgeColor: '#9E9E9E',
//    labelThreshold:0
//  });

//  graph.camera.goTo({
//    x:0,
//    y:0,
//    ratio:1.1,
//    angle:0
//  });

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

    graph = new sigma({
      renderer: {
        container: document.getElementById('graph-container'),
        type: 'canvas'
      },
      settings: {
        doubleClickEnabled: false,
        minEdgeSize: 0.5,
        maxEdgeSize: 4,
        maxNodeSize: 16,
        enableEdgeHovering: true,
        edgeHoverColor: 'edge',
        defaultEdgeHoverColor: '#000',
        edgeHoverSizeRatio: 1,
        edgeHoverExtremities: true,
        labelThreshold:0,
        edgeLabelSize: 'fixed',
        defaultEdgeLabelSize: 18,
        defaultLabelSize: 20
      }
    });
    var dragListener = sigma.plugins.dragNodes(graph, graph.renderers[0]);

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

      graph.bind('clickNode', function(e){
          console.log(e.data.node.id);
          if (e.data.node.isSelected) {
              e.data.node.color = "#000";
              e.data.node.isSelected = false;
            } else {
              e.data.node.color = "#0A0"; //зеленый
              e.data.node.isSelected = true;
              greenNodeIds[0] = e.data.node.id;
            }
            graph.refresh();
      });

      graph.bind('rightClickNode', function(e){
            console.log(e.data.node.id);
            if (e.data.node.isSelected) {
                e.data.node.color = "#000";
                e.data.node.isSelected = false;
                if(redNodeIds[0] == e.data.node.id) {
                    redNodeIds[0] = null;
                }
              } else {
                e.data.node.color = "#f00"; //красный
                e.data.node.isSelected = true;
                if(redNodeIds[0] == null) {
                    redNodeIds[0] = e.data.node.id;
                } else {
                    graph.graph.addEdge({ //добавление связей
                      id: redNodeIds[0]+""+e.data.node.id,
                      source: redNodeIds[0],
                      size: 12,
                      target: e.data.node.id,
                      color: '#ccc',
                      hover_color: '#000'
                    });
                    graph.graph.nodes().forEach(function(node) {
                        if(node.id == e.data.node.id || node.id == redNodeIds[0]) {
                            node.color = '#000';
                            node.isSelected = false;
                        }
                     });
                    redNodeIds[0]= null;
                }
              }
              graph.refresh();
        });

    $('#subButton').click(function() {
       console.log($('#inputEdge').val());
       edgeLabels[selectedEdgeId] = $('#inputEdge').val();
       console.log(Object.keys(edgeLabels));
       console.log(Object.values(edgeLabels));
    });

    $('#jsonButton').click(function() {
//       console.log(JSON.stringify({nodes: graph.graph.nodes(), edges: graph.graph.edges()}));
        some();
    });

    async function some() {
      let response = await fetch('/savejson', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({nodes: graph.graph.nodes(), edges: graph.graph.edges()})
         });

         let result = await response.json();
//         alert(result.toString());
        console.log(result);
    }

    var dom = document.querySelector('#graph-container canvas:last-child');

    dom.addEventListener('contextmenu', event => event.preventDefault());

      dom.addEventListener('dblclick', function(e) {

          var x,
              y,
              p,
              id,
              neighbors;

         x = sigma.utils.getX(e) - dom.offsetWidth / 2;
         y = sigma.utils.getY(e) - dom.offsetHeight / 2;

     p = graph.camera.cameraPosition(x, y);
        x = p.x;
        y = p.y;
        var test = ++nId;

            graph.graph.addNode({
              id: test,
              size: 50,
              label: test + "",
              x: x + Math.random() / 10,
              y: y + Math.random() / 10,
              dX: 0,
              dY: 0,
            });
            graph.refresh();
        }, false);


        $('html').keyup(function(e){
            if(e.keyCode == 46) {
                //greenNodeIds[0]
                graph.graph.dropNode(greenNodeIds[0]);
                graph.refresh();
            }
        });

});

