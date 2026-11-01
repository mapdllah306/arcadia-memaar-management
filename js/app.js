// V0.2.4 — modular browser-native ES modules (no build step required).
// Static hosting compatible: GitHub Pages. Demo data remains local-only.
import {$,icon,esc,day,safeCsvCell} from './core/utils.js?v=0.2.4';
import {createSeed} from './core/seed.js?v=0.2.4';
import {LABELS,STATUS_CLASS,NAV} from './core/config.js?v=0.2.4';
import {createStore} from './core/store.js?v=0.2.4';
import {createTemplates} from './ui/templates.js?v=0.2.4';
import {createDashboardPage} from './pages/dashboard.js?v=0.2.4';
import {createSitesPages} from './pages/sites.js?v=0.2.4';
import {createEmployeePage} from './pages/employees.js?v=0.2.4';
import {createTasksPage} from './pages/tasks.js?v=0.2.4';
import {createReportsPages} from './pages/reports.js?v=0.2.4';
import {createLayout} from './ui/layout.js?v=0.2.4';
import {createDialogs} from './ui/dialogs.js?v=0.2.4';
import {createFormOptions} from './features/form-options.js?v=0.2.4';
import {createTaskActions} from './features/tasks.js?v=0.2.4';
import {createSiteActions} from './features/sites.js?v=0.2.4';
import {createEmployeeActions} from './features/employees.js?v=0.2.4';
import {initEvents} from './ui/events.js?v=0.2.4';

const SEED=createSeed(day);
const {data,save,resetData}=createStore(SEED);
const state={page:'dashboard',company:'all',site:'all',search:'',status:'all'};
const company=id=>data.companies.find(x=>x.id===id);
const site=id=>data.sites.find(x=>x.id===id);
const employee=id=>data.employees.find(x=>x.id===id);
const companyName=id=>company(id)?.arabic||'—';
const siteName=id=>site(id)?.name||'—';
const employeeName=id=>id?employee(id)?.name||'غير معروف':'غير مسندة';
const deptName=id=>LABELS[id]||id;
const matches=x=>(state.company==='all'||x.companyId===state.company)&&(state.site==='all'||x.siteId===state.site);
const fTasks=()=>data.tasks.filter(matches);
const fEmployees=()=>data.employees.filter(matches);
const fSites=()=>data.sites.filter(s=>(state.company==='all'||s.companyId===state.company)&&(state.site==='all'||s.id===state.site));

const ctx={$,icon,esc,day,safeCsvCell,SEED,LABELS,STATUS_CLASS,NAV,
  data,state,save,resetData,company,site,employee,companyName,siteName,
  employeeName,deptName,fTasks,fEmployees,fSites};
Object.assign(ctx,createTemplates(ctx));
Object.assign(ctx,createDashboardPage(ctx));
Object.assign(ctx,createSitesPages(ctx));
Object.assign(ctx,createEmployeePage(ctx));
Object.assign(ctx,createTasksPage(ctx));
Object.assign(ctx,createReportsPages(ctx));
Object.assign(ctx,createLayout(ctx));
Object.assign(ctx,createDialogs(ctx));
Object.assign(ctx,createFormOptions(ctx));
Object.assign(ctx,createTaskActions(ctx));
Object.assign(ctx,createSiteActions(ctx));
Object.assign(ctx,createEmployeeActions(ctx));
initEvents(ctx);
