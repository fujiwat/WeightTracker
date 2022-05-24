namespace WeightTracker

open WebSharper
open WebSharper.UI
open WebSharper.UI.Templating
open WebSharper.UI.Notation
open WebSharper.Charting
open WebSharper.UI.Client

[<JavaScript>]
module Templates =
    type MainTemplate = Templating.Template<"Main.html", ClientLoad.FromDocument, ServerLoad.WhenChanged>

[<JavaScript>]
module Client =
    type Weight =
        {
            WeightValue: string;
            WeightDate: string;
            WeightNotes: string;
        }
        static member Create _value _date _notes =
            {
                WeightValue = _value
                WeightDate = _date
                WeightNotes = _notes
            }
    let weightLog =
            ListModel.FromSeq [
                Weight.Create "75.2" "2022-05-18" ""
                Weight.Create "77.2" "2022-05-19" "Party"
                Weight.Create "76.2" "2022-05-20" ""
                Weight.Create "75.1" "2022-05-21" ""
                Weight.Create "78.1" "2022-05-22" "Drunk too much"
                Weight.Create "77.2" "2022-05-23" ""
              ]
 
    let  datah = ListModel.FromSeq[]
    weightLog.Iter(fun t ->
              (string  t.WeightDate, float t.WeightValue) |> datah.Add )
    let mutable dataty = []
    let mutable minWeight:float = 9999.
    let mutable maxWeight:float = 0.
    let mutable dataMin = []
    let mutable dataMax = []
   
    let Main () =
        let msg = Var.Create ""
        let newWeight = ListModel.FromSeq []
        newWeight.Clear()
        weightLog.Iter(fun t ->
            Weight.Create (t.WeightValue) (t.WeightDate) (t.WeightNotes) |> newWeight.Add )
        for x in newWeight do
             dataty  <- [(x.WeightDate,float x.WeightValue)] |> List.append dataty

        for x in newWeight do
            if ((float x.WeightValue) < minWeight) then minWeight <- (float x.WeightValue)
            if (maxWeight < (float x.WeightValue)) then maxWeight <- (float x.WeightValue)
        for x in newWeight do
             dataMin  <- [(x.WeightDate,float minWeight-(maxWeight-minWeight))] |> List.append dataMin
             dataMax  <- [(x.WeightDate,float maxWeight+(maxWeight-minWeight))] |> List.append dataMax

        let input entry =
            Templates.MainTemplate.input()
                .theWeight(entry.WeightValue)
                .theDate(entry.WeightDate)
                .theNotes(entry.WeightNotes)
                .Doc()
        let strContainsOnlyNumber (s:string) = System.Double.TryParse s |> fst        
        let data =
            newWeight.View.Doc(fun lm -> 
                lm 
                |> Seq.sortBy (fun t -> t.WeightDate ) 
                |> Seq.map input
                |> Doc.Concat
            )

        let  chart = Chart.Combine [
            Chart.Line(dataty)
                .WithStrokeColor(Color.Name("Blue"))
                .WithPointColor(Color.Name("Blue"))
            Chart.Line(dataMin)
                .WithStrokeColor(Color.Name("ghostwhite"))
                .WithPointColor(Color.Name("ghostwhite"))
            Chart.Line(dataMax)
                .WithStrokeColor(Color.Name("ghostwhite"))
                .WithPointColor(Color.Name("ghostwhite"))
        ]
        let msg = Var.Create ""
        Templates.MainTemplate.MainForm()
            .Log(data)
            .OnSend(fun e ->
                 (
                    if(e.Vars.inputWeight.Value = "" || e.Vars.inputDate.Value = "" ||not (strContainsOnlyNumber e.Vars.inputWeight.Value)  )
                    then
                        msg := "Please input a valid value"
                    else 
                        msg := "Ok."
                        Weight.Create (e.Vars.inputWeight.Value) ( e.Vars.inputDate.Value) (e.Vars.inputNotes.Value)
                        |> weightLog.Add
                        Weight.Create (e.Vars.inputWeight.Value) ( e.Vars.inputDate.Value) (e.Vars.inputNotes.Value)
                        |> newWeight.Add
                        let lastitem = float e.Vars.inputWeight.Value
                        newWeight.Iter(fun t ->(t.WeightDate,float t.WeightValue) |> datah.Add )
//test
                        dataty  <- ([("chou",5.0)] |> List.append dataty)
                        msg := "Ok."
//                        chart.UpdateData(5, fun e -> e + 10.)
//test end
                )
            )
            .Graph(Renderers.ChartJs.Render(chart, Window = 10))
            .Msg(msg.View)
            .Doc()