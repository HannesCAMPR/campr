import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Projects from '../components/Projects/Projects.vue';
import ProjectCreateStep1 from '../components/Projects/ProjectCreateStep1.vue';
import ProjectCreateStep2 from '../components/Projects/ProjectCreateStep2.vue';
import ProjectCreateStep3 from '../components/Projects/ProjectCreateStep3.vue';
import ViewProject from '../components/Projects/ViewProject.vue';
import ProjectDashboard from '../components/Projects/ProjectDashboard.vue';
import ProjectContract from '../components/Projects/ProjectContract.vue';
import ProjectOrganization from '../components/Projects/ProjectOrganization.vue';
import TaskManagement from '../components/Projects/TaskManagement/TaskManagement.vue';
import List from '../components/Projects/TaskManagement/List.vue';
import View from '../components/Projects/TaskManagement/View.vue';
import Create from '../components/Projects/TaskManagement/Create.vue';
import AddLabel from '../components/Projects/TaskManagement/AddLabel.vue';
import EditLabels from '../components/Projects/TaskManagement/EditLabels.vue';
import ViewTask from '../components/Tasks/ViewTask.vue';
import Tasks from '../components/Tasks/Tasks.vue';
import MemberCreate from '../components/Projects/Organization/MemberCreate.vue';
import EditOrganization from '../components/Projects/Organization/EditOrganization.vue';
import ProjectPhasesMilestones from '../components/Projects/ProjectPhasesMilestones.vue';
import PhaseCreate from '../components/Projects/Phases/PhaseCreate.vue';
import PhaseView from '../components/Projects/Phases/PhaseView.vue';
import MilestoneCreate from '../components/Projects/Milestones/MilestoneCreate.vue';
import MilestoneView from '../components/Projects/Milestones/MilestoneView.vue';
import ProjectRisksOpportunities from '../components/Projects/ProjectRisksOpportunities.vue';
import RiskCreate from '../components/Projects/Risks/RiskCreate.vue';
import OpportunityCreate from '../components/Projects/Opportunities/OpportunityCreate.vue';
import RiskView from '../components/Projects/Risks/RiskView.vue';
import OpportunityView from '../components/Projects/Opportunities/OpportunityView.vue';
import ProjectMeetings from '../components/Projects/ProjectMeetings.vue';
import MeetingCreate from '../components/Projects/Meetings/MeetingCreate.vue';
import EditMeeting from '../components/Projects/Meetings/EditMeeting.vue';
import ViewMeeting from '../components/Projects/Meetings/ViewMeeting.vue';
import Gantt from '../components/Projects/Gantt.vue';
import ProjectTodos from '../components/Projects/ProjectTodos.vue';
import TodoCreate from '../components/Projects/Todos/TodoCreate.vue';
import EditTodo from '../components/Projects/Todos/EditTodo.vue';
import ViewTodo from '../components/Projects/Todos/ViewTodo.vue';
import Costs from '../components/Projects/Costs.vue';
import Resources from '../components/Projects/Resources.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        redirect: {name: 'dashboard'},
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {requiresAuth: true},
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
    },
    {
        path: '/projects/create/step/1',
        name: 'projects-create-1',
        component: ProjectCreateStep1,
    },
    {
        path: '/projects/create/step/2',
        name: 'projects-create-2',
        component: ProjectCreateStep2,
    },
    {
        path: '/projects/create/step/3',
        name: 'projects-create-3',
        component: ProjectCreateStep3,
    },
    {
        path: '/projects/:id',
        component: ViewProject,
        children: [
            {
                path: 'dashboard',
                component: ProjectDashboard,
                name: 'project-dashboard',
            },
            {
                path: 'contract',
                component: ProjectContract,
                name: 'project-contract',
            },
            {
                path: 'organization',
                component: ProjectOrganization,
                name: 'project-organization',
            },
            {
                path: 'organization/member-create',
                component: MemberCreate,
                name: 'project-organization-create-member',
            },
            {
                path: 'organization/edit',
                component: EditOrganization,
                name: 'project-organization-edit',
            },
            {
                path: 'task-management',
                component: TaskManagement,
                children: [
                    {
                        path: 'list',
                        component: List,
                        name: 'project-task-management-list',
                    },
                    {
                        path: 'view/:taskId',
                        component: View,
                        name: 'project-task-management-view',
                    },
                    {
                        path: 'add',
                        component: Create,
                        name: 'project-task-management-create',
                    },
                    {
                        path: 'edit/:taskId',
                        component: Create,
                        name: 'project-task-management-edit',
                    },
                    {
                        path: 'add-label',
                        component: AddLabel,
                        name: 'project-task-management-add-label',
                    },
                    {
                        path: 'edit-label/:labelId',
                        component: AddLabel,
                        name: 'project-task-management-edit-label',
                    },
                    {
                        path: 'edit-labels',
                        component: EditLabels,
                        name: 'project-task-management-edit-labels',
                    },
                ],
            },
            {
                path: 'phases-and-milestones',
                component: ProjectPhasesMilestones,
                name: 'project-phases-and-milestones',
            },
            {
                path: 'phases-and-milestones/create-phase',
                component: PhaseCreate,
                name: 'project-phases-create-phase',
            },
            {
                path: 'phases-and-milestones/edit-phase/:phaseId',
                component: PhaseCreate,
                name: 'project-phases-edit-phase',
            },
            {
                path: 'phases-and-milestones/phase/:phaseId',
                component: PhaseView,
                name: 'project-phases-view-phase',
            },
            {
                path: 'phases-and-milestones/create-milestone',
                component: MilestoneCreate,
                name: 'project-milestones-create-milestone',
            },
            {
                path: 'phases-and-milestones/edit-milestone/:milestoneId',
                component: MilestoneCreate,
                name: 'project-milestones-edit-milestone',
            },
            {
                path: 'phases-and-milestones/milestone/:milestoneId',
                component: MilestoneView,
                name: 'project-phases-view-milestone',
            },
            {
                path: 'risks-and-opportunities',
                component: ProjectRisksOpportunities,
                name: 'project-risks-and-opportunities',
            },
            {
                path: 'risks-and-opportunities/create-risk',
                component: RiskCreate,
                name: 'project-risks-create-risk',
            },
            {
                path: 'risks-and-opportunities/risk/:riskId',
                component: RiskView,
                name: 'project-risks-view-risk',
            },
            {
                path: 'risks-and-opportunities/edit-risk/:riskId',
                component: RiskCreate,
                name: 'project-risks-edit-risk',
            },
            {
                path: 'risks-and-opportunities/create-opportunity',
                component: OpportunityCreate,
                name: 'project-opportunities-create-opportunity',
            },
            {
                path: 'risks-and-opportunities/opportunity/:opportunityId',
                component: OpportunityView,
                name: 'project-opportunities-view-opportunity',
            },
            {
                path: 'risks-and-opportunities/edit-opportunity/:opportunityId',
                component: OpportunityCreate,
                name: 'project-opportunities-edit-opportunity',
            },
            {
                path: 'meetings',
                component: ProjectMeetings,
                name: 'project-meetings',
            },
            {
                path: 'meetings/create-meeting',
                component: MeetingCreate,
                name: 'project-meetings-create-meeting',
            },
            {
                path: 'meetings/edit-meeting',
                component: EditMeeting,
                name: 'project-meetings-edit-meeting',
            },
            {
                path: 'meetings/view-meeting',
                component: ViewMeeting,
                name: 'project-meetings-view-meeting',
            },
            {
                path: 'gantt-chart',
                component: Gantt,
                name: 'project-gantt-chart',
            },
            {
                path: 'todos',
                component: ProjectTodos,
                name: 'project-todos',
            },
            {
                path: 'todos/create-todo',
                component: TodoCreate,
                name: 'project-todos-create-todo',
            },
            {
                path: 'todos/edit-todo',
                component: EditTodo,
                name: 'project-todos-edit-todo',
            },
            {
                path: 'todos/view-todo',
                component: ViewTodo,
                name: 'project-todos-view-todo',
            },
            {
                path: 'costs',
                component: Costs,
                name: 'project-costs',
            },
            {
                path: 'resources',
                component: Resources,
                name: 'project-resources',
            },
        ],
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
    },
    {
        path: '/tasks/:id',
        name: 'task',
        component: ViewTask,
    },
];

export default new VueRouter({
    routes,
});
