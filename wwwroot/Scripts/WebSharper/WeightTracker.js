(function(Global)
{
 "use strict";
 var WeightTracker,Client,Weight,SC$1,WeightTracker_Templates,WebSharper,List,UI,Templating,Runtime,Server,ProviderBuilder,Handler,TemplateInstance,Var$1,ListModel,Enumerator,Doc,Seq,Charting,Chart,Pervasives,Renderers,ChartJs,Client$1,Templates;
 WeightTracker=Global.WeightTracker=Global.WeightTracker||{};
 Client=WeightTracker.Client=WeightTracker.Client||{};
 Weight=Client.Weight=Client.Weight||{};
 SC$1=Global.StartupCode$WeightTracker$Client=Global.StartupCode$WeightTracker$Client||{};
 WeightTracker_Templates=Global.WeightTracker_Templates=Global.WeightTracker_Templates||{};
 WebSharper=Global.WebSharper;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Templating=UI&&UI.Templating;
 Runtime=Templating&&Templating.Runtime;
 Server=Runtime&&Runtime.Server;
 ProviderBuilder=Server&&Server.ProviderBuilder;
 Handler=Server&&Server.Handler;
 TemplateInstance=Server&&Server.TemplateInstance;
 Var$1=UI&&UI.Var$1;
 ListModel=UI&&UI.ListModel;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Doc=UI&&UI.Doc;
 Seq=WebSharper&&WebSharper.Seq;
 Charting=WebSharper&&WebSharper.Charting;
 Chart=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 Weight.Create=function(_value,_date,_notes)
 {
  return Weight.New(_value,_date,_notes);
 };
 Weight.New=function(WeightValue,WeightDate,WeightNotes)
 {
  return{
   WeightValue:WeightValue,
   WeightDate:WeightDate,
   WeightNotes:WeightNotes
  };
 };
 Client.Main$92$20=function(strContainsOnlyNumber,msg,newWeight)
 {
  return function(e)
  {
   var a,l;
   if(e.Vars.Hole("inputweight").$1.Get()===""||e.Vars.Hole("inputdate").$1.Get()===""||!strContainsOnlyNumber(e.Vars.Hole("inputweight").$1.Get()))
    msg.Set("Please input a valid value");
   else
    {
     msg.Set("Ok.");
     a=Weight.Create(e.Vars.Hole("inputweight").$1.Get(),e.Vars.Hole("inputdate").$1.Get(),e.Vars.Hole("inputnotes").$1.Get());
     Client.weightLog().Append(a);
     newWeight.Append(Weight.Create(e.Vars.Hole("inputweight").$1.Get(),e.Vars.Hole("inputdate").$1.Get(),e.Vars.Hole("inputnotes").$1.Get()));
     e.Vars.Hole("inputweight").$1.Get();
     newWeight.Iter(function(t)
     {
      Client.datah().Append([t.WeightDate,Global.Number(t.WeightValue)]);
     });
     Client.set_dataty((l=List.ofArray([["chou",5]]),List.append(Client.dataty(),l)));
     msg.Set("Ok.");
    }
  };
 };
 Client.Main=function()
 {
  var $1,data,chart,msg,b,M,_this,G,_this$1,t,_this$2,p,i,newWeight,e,x,l,e$1,x$1,e$2,x$2,l$1,l$2;
  function input(entry)
  {
   var b$1,_this$3,_this$4,_this$5,p$1,i$1;
   return(b$1=(_this$3=(_this$4=(_this$5=new ProviderBuilder.New$1(),(_this$5.h.push({
    $:1,
    $0:"theweight",
    $1:entry.WeightValue
   }),_this$5)),(_this$4.h.push({
    $:1,
    $0:"thedate",
    $1:entry.WeightDate
   }),_this$4)),(_this$3.h.push({
    $:1,
    $0:"thenotes",
    $1:entry.WeightNotes
   }),_this$3)),(p$1=Handler.CompleteHoles(b$1.k,b$1.h,[]),(i$1=new TemplateInstance.New(p$1[1],WeightTracker_Templates.input(p$1[0])),b$1.i=i$1,i$1))).get_Doc();
  }
  function strContainsOnlyNumber(s)
  {
   var o,$2;
   return(o=0,[($2=Global.Number(s),Global.isNaN($2)?false:(o=$2,true)),o])[0];
  }
  Var$1.Create$1("");
  newWeight=ListModel.FromSeq([]);
  newWeight.Clear();
  Client.weightLog().Iter(function(t$1)
  {
   newWeight.Append(Weight.Create(t$1.WeightValue,t$1.WeightDate,t$1.WeightNotes));
  });
  e=Enumerator.Get(newWeight);
  try
  {
   while(e.MoveNext())
    {
     x=e.Current();
     Client.set_dataty((l=List.ofArray([[x.WeightDate,Global.Number(x.WeightValue)]]),List.append(Client.dataty(),l)));
    }
  }
  finally
  {
   if(typeof e=="object"&&"Dispose"in e)
    e.Dispose();
  }
  e$1=Enumerator.Get(newWeight);
  try
  {
   while(e$1.MoveNext())
    {
     x$1=e$1.Current();
     if(Global.Number(x$1.WeightValue)<Client.minWeight())
      Client.set_minWeight(Global.Number(x$1.WeightValue));
     if(Client.maxWeight()<Global.Number(x$1.WeightValue))
      Client.set_maxWeight(Global.Number(x$1.WeightValue));
    }
  }
  finally
  {
   if(typeof e$1=="object"&&"Dispose"in e$1)
    e$1.Dispose();
  }
  e$2=Enumerator.Get(newWeight);
  try
  {
   while(e$2.MoveNext())
    {
     x$2=e$2.Current();
     Client.set_dataMin((l$1=List.ofArray([[x$2.WeightDate,Client.minWeight()-(Client.maxWeight()-Client.minWeight())]]),List.append(Client.dataMin(),l$1)));
     Client.set_dataMax((l$2=List.ofArray([[x$2.WeightDate,Client.maxWeight()+(Client.maxWeight()-Client.minWeight())]]),List.append(Client.dataMax(),l$2)));
    }
  }
  finally
  {
   if(typeof e$2=="object"&&"Dispose"in e$2)
    e$2.Dispose();
  }
  data=Doc.BindView(function(lm)
  {
   return Doc.Concat(Seq.map(input,Seq.sortBy(function(t$1)
   {
    return t$1.WeightDate;
   },lm)));
  },newWeight.v);
  chart=Chart.Combine([Chart.Line$1(Client.dataty()).__WithStrokeColor(new Pervasives.Color({
   $:2,
   $0:"Blue"
  })).__WithPointColor(new Pervasives.Color({
   $:2,
   $0:"Blue"
  })),Chart.Line$1(Client.dataMin()).__WithStrokeColor(new Pervasives.Color({
   $:2,
   $0:"ghostwhite"
  })).__WithPointColor(new Pervasives.Color({
   $:2,
   $0:"ghostwhite"
  })),Chart.Line$1(Client.dataMax()).__WithStrokeColor(new Pervasives.Color({
   $:2,
   $0:"ghostwhite"
  })).__WithPointColor(new Pervasives.Color({
   $:2,
   $0:"ghostwhite"
  }))]);
  msg=Var$1.Create$1("");
  return(b=(M=msg.get_View(),_this=(G=ChartJs.Render$2(chart,null,null,{
   $:1,
   $0:10
  }),_this$1=(t=(_this$2=new ProviderBuilder.New$1(),_this$2.h.push({
   $:0,
   $0:"log",
   $1:data
  }),_this$2),t.h.push(Handler.EventQ2(t.k,"onsend",function()
  {
   return t.i;
  },function(e$3)
  {
   var a,l$3;
   if(e$3.Vars.Hole("inputweight").$1.Get()===""||e$3.Vars.Hole("inputdate").$1.Get()===""||!strContainsOnlyNumber(e$3.Vars.Hole("inputweight").$1.Get()))
    msg.Set("Please input a valid value");
   else
    {
     msg.Set("Ok.");
     a=Weight.Create(e$3.Vars.Hole("inputweight").$1.Get(),e$3.Vars.Hole("inputdate").$1.Get(),e$3.Vars.Hole("inputnotes").$1.Get());
     Client.weightLog().Append(a);
     newWeight.Append(Weight.Create(e$3.Vars.Hole("inputweight").$1.Get(),e$3.Vars.Hole("inputdate").$1.Get(),e$3.Vars.Hole("inputnotes").$1.Get()));
     e$3.Vars.Hole("inputweight").$1.Get();
     newWeight.Iter(function(t$1)
     {
      Client.datah().Append([t$1.WeightDate,Global.Number(t$1.WeightValue)]);
     });
     Client.set_dataty((l$3=List.ofArray([["chou",5]]),List.append(Client.dataty(),l$3)));
     msg.Set("Ok.");
    }
  })),t),_this$1.h.push({
   $:0,
   $0:"graph",
   $1:G
  }),_this$1),_this.h.push({
   $:2,
   $0:"msg",
   $1:M
  }),_this),p=Handler.CompleteHoles(b.k,b.h,[["inputweight",0],["inputdate",0],["inputnotes",0]]),i=new TemplateInstance.New(p[1],WeightTracker_Templates.mainform(p[0])),b.i=i,i).get_Doc();
 };
 Client.dataMax=function()
 {
  SC$1.$cctor();
  return SC$1.dataMax;
 };
 Client.set_dataMax=function($1)
 {
  SC$1.$cctor();
  SC$1.dataMax=$1;
 };
 Client.dataMin=function()
 {
  SC$1.$cctor();
  return SC$1.dataMin;
 };
 Client.set_dataMin=function($1)
 {
  SC$1.$cctor();
  SC$1.dataMin=$1;
 };
 Client.maxWeight=function()
 {
  SC$1.$cctor();
  return SC$1.maxWeight;
 };
 Client.set_maxWeight=function($1)
 {
  SC$1.$cctor();
  SC$1.maxWeight=$1;
 };
 Client.minWeight=function()
 {
  SC$1.$cctor();
  return SC$1.minWeight;
 };
 Client.set_minWeight=function($1)
 {
  SC$1.$cctor();
  SC$1.minWeight=$1;
 };
 Client.dataty=function()
 {
  SC$1.$cctor();
  return SC$1.dataty;
 };
 Client.set_dataty=function($1)
 {
  SC$1.$cctor();
  SC$1.dataty=$1;
 };
 Client.datah=function()
 {
  SC$1.$cctor();
  return SC$1.datah;
 };
 Client.weightLog=function()
 {
  SC$1.$cctor();
  return SC$1.weightLog;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.weightLog=ListModel.FromSeq([Weight.Create("75.2","2022-05-18",""),Weight.Create("77.2","2022-05-19","Party"),Weight.Create("76.2","2022-05-20",""),Weight.Create("75.1","2022-05-21",""),Weight.Create("78.1","2022-05-22","Drunk too much"),Weight.Create("77.2","2022-05-23","")]);
  SC$1.datah=ListModel.FromSeq([]);
  Client.weightLog().Iter(function(t)
  {
   Client.datah().Append([Global.String(t.WeightDate),Global.Number(t.WeightValue)]);
  });
  SC$1.dataty=List.T.Empty;
  SC$1.minWeight=9999;
  SC$1.maxWeight=0;
  SC$1.dataMin=List.T.Empty;
  SC$1.dataMax=List.T.Empty;
 };
 WeightTracker_Templates.input=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"input"
  },h):void 0;
 };
 WeightTracker_Templates.mainform=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"mainform"
  },h):void 0;
 };
}(self));
