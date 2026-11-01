// V0.2.1 — modular browser-native ES modules (no build step required).
// Static hosting compatible: GitHub Pages. Demo data remains local-only.
import {$,icon,esc,day,safeCsvCell} from './core/utils.js';
import {createSeed} from './core/seed.js';
import {LABELS,STATUS_CLASS,NAV} from './core/config.js';
import {createStore} from './core/store.js';
import {createTemplates} from './ui/templates.js';
import {createDashboardPage} from './pages/dashboard.js';
import {createSitesPages} from './pages/sites.js';
import {createEmployeePage} from './pages/employees.js';
import {createTasksPage} from './pages/tasks.js';
import {createReportsPages} from './pages/reports.js';
import {createLayout} from './ui/layout.js';
import {createDialogs} from './ui/dialogs.js';
import {createFormOptions} from './features/form-options.js';
import {createTaskActions} from './features/tasks.js';
import {createSiteActions} from './features/sites.js';
import {createEmployeeActions} from './features/employees.js';
import {initEvents} from './ui/events.js';

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
