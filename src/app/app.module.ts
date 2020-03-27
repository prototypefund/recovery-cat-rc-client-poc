import 	{ 	NgModule } 						from '@angular/core'
import 	{ 	BrowserModule } 				from '@angular/platform-browser'
import 	{ 	RouteReuseStrategy } 			from '@angular/router'

import 	{ 
			IonicModule, 
			IonicRouteStrategy 
		}									from '@ionic/angular'
import 	{ 	SplashScreen }					from '@ionic-native/splash-screen/ngx'
import 	{ 	StatusBar }						from '@ionic-native/status-bar/ngx'

import 	{ 	AppRoutingModule }				from './app-routing.module'
import 	{ 	AppComponent }					from './app.component'
import 	{ 	QueryRunModule }				from './query-run/query-run.module'
import 	{ 	FallbackQueryWidgetsModule}		from './fallback-query-widgets'
import	{	QWCService }					from './query-run/query-widget-components.service'



@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule,	
		QueryRunModule,			
		FallbackQueryWidgetsModule.atPriority(5),
	],
	providers: [		
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
