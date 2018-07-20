import store from '../../../store';

export default {
    vote(route, config) {
        const project = store.state.project
            ? store.state.project.currentProject
            : null;

        if (!project || !project.projectModules) {
            return false;
        }

        for (let c = 0; c < config.length; c++) {
            if (project.projectModules.indexOf(config[c]) === -1) {
                if (process && process.env.NODE_ENV !== 'production') {
                    console.warn('Required project module(s) not enabled: ' + config[c]);
                }
                return false;
            }
        }

        return true;
    },
    supports(key) {
        return key.toLowerCase() === 'projectmodule';
    },
};
