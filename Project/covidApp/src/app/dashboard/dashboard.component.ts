import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public rowData: any;
  public country;
  public confirmed;
  public deaths;
  public recovered;
  public columnDefs;
  public userArry
  public stat;
  public rowSelection: string;
  public rowGroupPanelShow: string;
  public gridApi;
  public pivotPanelShow: string;
  public selectedObject: any;
  public isgridVisible=true;
  public isRowSelected=false;
  public newConfirmed;
  public newRecovered;
  public newDeaths;
  constructor( private apiService: ApiServiceService,) { 
this.stat=[];
    this.apiService.getDataFromServer("https://api.covid19api.com/summary","", "")
    .subscribe((response) => {
      this.userArry= response.Countries;
     this.rowData = response;

     
    
     this.confirmed=this.rowData.Global.TotalConfirmed;
     this.recovered=this.rowData.Global.TotalRecovered;
     this.deaths=this.rowData.Global.TotalDeaths;
       
    });

    
  }

  ngOnInit(): void {

    this.columnDefs = [
      { headerName: 'Country Code', width:90,field: 'CountryCode', sortable: true },
      { headerName: 'Country', field: 'Country', sortable: true },
      { headerName: 'New Confirmed', field: 'NewConfirmed', sortable: true },
      { headerName: 'New Recovered', field: 'NewRecovered', sortable: true },
      { headerName: 'New Deaths', field: 'NewDeaths', sortable: true },
      { headerName: 'Total Confirmed', field: 'TotalConfirmed', sortable: true },
      { headerName: 'Total Recovered', field: 'TotalRecovered', sortable: true },
      { headerName: 'Total Deaths', field: 'TotalDeaths', sortable: true },
      
    ];
  
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
  }

  onSelectionChanged(ev)
  {
    this.selectedObject  = null;
    let rowCount = ev.api.getSelectedNodes().length;
    let selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedObject = selectedNodes.map(node => node.data);
    console.log(this.selectedObject)
    this.isRowSelected=true;
    this.country=this.selectedObject[0].Country;
    this.confirmed=this.selectedObject[0].TotalConfirmed;
    this.recovered=this.selectedObject[0].TotalRecovered;
    this.deaths=this.selectedObject[0].TotalDeaths;
    this.newRecovered=this.selectedObject[0].NewRecovered;
    this.newConfirmed=this.selectedObject[0].NewConfirmed;
    this.newDeaths=this.selectedObject[0].NewDeaths;
    
  }


  onGridReady(params)
  {
    params.api.sizeColumnsToFit();
      this.gridApi = params.api;
    
  }
}
