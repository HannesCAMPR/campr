<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div v-bind:class="{'rasci-matrix page-section': true, 'fixed': fixed}" ref="rasciTopSection">
                    <!-- /// Header /// -->
                    <div class="header flex-v-center">
                        <div>
                            <h1>{{ translate('message.rasci_matrix') }}</h1>
                            <div class="rasci-legend flex">
                                <div class="rasci-legend-item">
                                    <responsibility-select value="responsible" :disabled="true"/>
                                    <span>{{ translate('message.responsible') }}</span>
                                </div>
                                <div class="rasci-legend-item">
                                    <responsibility-select value="accountable" :disabled="true"/>
                                    <span>{{ translate('message.accountable') }}</span>
                                </div>
                                <div class="rasci-legend-item">
                                    <responsibility-select value="support" :disabled="true"/>
                                    <span>{{ translate('message.support') }}</span>
                                </div>
                                <div class="rasci-legend-item">
                                    <responsibility-select value="consulted" :disabled="true"/>
                                    <span>{{ translate('message.consulted') }}</span>
                                </div>
                                <div class="rasci-legend-item">
                                    <responsibility-select value="informed" :disabled="true"/>
                                    <span>{{ translate('message.informed') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /// End Header /// -->
                    <table class="table table-striped table-responsive rasci-table">
                        <thead>
                            <tr>
                                <th class="task-number" width="10%">{{ translateText('table_header_cell.task_number') }}</th>
                                <th>{{ translateText('table_header_cell.task_title') }}</th>
                                <th v-for="(user, userIndex) in users"
                                    :key="user.id"
                                    :class="{'rasci-cell': true, 'active-cell': activeCell === userIndex}">
                                    <user-avatar
                                            size="small"
                                            :name="`${user.firstName} ${user.lastName}`"
                                            :url="getUserAvatar(user)"
                                            :tooltip="`${user.firstName} ${user.lastName}`"/>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
        
                <!-- /// RASCI /// -->
                <table class="table table-striped table-responsive rasci-table rasci-table__top" v-bind:class="{'fixed': fixed}">
                    <thead>
                        <tr>
                            <th class="task-number" width="10%">{{ translateText('table_header_cell.task_number') }}</th>
                            <th>{{ translateText('table_header_cell.task_title') }}</th>
                            <th v-for="(user, userIndex) in users"
                                :key="user.id"
                                :class="{'rasci-cell': true, 'active-cell': activeCell === userIndex}">
                                <user-avatar
                                        size="small"
                                        :name="`${user.firstName} ${user.lastName}`"
                                        :url="getUserAvatar(user)"
                                        :tooltip="`${user.firstName} ${user.lastName}`"/>
                            </th>
                        </tr>
                    </thead>                  
                    <tbody>
                        <tr v-for="(workPackage, rasciIndex) in workPackages"
                            :key="workPackage.id"
                            :class="{'active-row': activeRow === rasciIndex}"
                            v-on:mouseover="activeRow = rasciIndex"
                            v-on:mouseout="activeRow = null">
                            <td v-if="workPackage.type !== 2" @click.stop="closeRasciModal" ref="closeModal">
                                {{ repeat('&nbsp', workPackage.type * 6) }}{{ workPackage.name }}
                            </td>
                            <td class="task-number" width="10%" v-if="workPackage.type === 2" @click.stop="closeRasciModal" ref="closeModal">
                                <span class="light-color">
                                    <template v-if="workPackage.hasPhase || workPackage.hasMilestone">
                                        {{ repeat('&nbsp', workPackage.type * 6) }}#{{ workPackage.id }}
                                    </template>
                                    <template v-else>
                                        #{{ workPackage.id }}
                                    </template>
                                </span>
                            </td>
                            <td @click.stop="closeRasciModal" ref="closeModal">
                                <span v-if="workPackage.type === 2">
                                     <router-link
                                            :to="{name: 'project-task-management-view', params: { id: workPackage.project, taskId: workPackage.id }}">
                                        {{ workPackage.name }}
                                    </router-link>
                                </span>
                            </td>
                            <td v-for="(user, userIndex) in workPackage.rasci"
                                v-on:mouseover="activeCell = workPackage.type === 2 && userIndex"
                                v-on:mouseout="activeCell = null"
                                :class="{'rasci-cell': true, 'active-cell': activeCell === userIndex}"
                                @click.stop="closeRasciModal" ref="closeModal">
                                <responsibility-select
                                        v-if="workPackage.type === 2"
                                        :last="userIndex + 1 === workPackage.rasci.length"
                                        :second-to-last="userIndex + 2 === workPackage.rasci.length"
                                        :value="user.data"
                                        v-bind:activeElem="activeElement"
                                        :elementKey="generateElementKey(workPackage.name + workPackage.id + userIndex)"
                                        @handleClick="activeElement = $event"
                                        @input="setRaciData({project: workPackage.project, user: user.user, workPackage: workPackage.id, userObj:user, data: $event})"
                                        @close="deleteRasciData({project: workPackage.project, user: user.user, workPackage: workPackage.id})"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ResponsibilitySelect from '../_common/_rasci-components/ResponsibilitySelect.vue';
import {mapActions, mapGetters} from 'vuex';
import UserAvatar from '../_common/UserAvatar';

export default {
    components: {
        UserAvatar,
        ResponsibilitySelect,
    },
    methods: {
        ...mapActions(['getRasci', 'setRasci', 'deleteRasci']),
        translateText: function(text) {
            return this.translate(text);
        },
        setRaciData: function({project, user, workPackage, userObj, data}) {
            this.setRasci({project, user, workPackage, data}).then(() => {
                this.loadRasci();
                if(userObj.data != data) {
                    this.activeElement = '';
                }
            }, (userObj, data));
        },
        deleteRasciData: function({project, user, workPackage}) {
            this.deleteRasci({project, user, workPackage}).then(() => {
                this.loadRasci();
                this.activeElement = '';
            });
        },
        repeat(str, count) {
            let c = 0;
            let out = '';
            for (; c < count; c++) {
                out += str;
            }
            return out;
        },
        loadRasci() {
            const {id} = this.$route.params;
            this.getRasci({id});
        },
        getUserAvatar(user) {
            return user.avatarUrl;
        },
        generateElementKey(string) {
            string = string.toLowerCase();
            string = string.replace(/\s*$/g, '');
            string = string.replace(/\s+/g, '-');
            return string;
        },
        closeRasciModal(event) {
            this.$refs.closeModal.map((item) => {
                if(item == event.target) {
                    this.activeElement = '';
                }
            });
        },
        handleScroll() {
            if (window.scrollY >= 100) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
    },
    computed: {
        ...mapGetters(['rasci', 'currentProject']),
        workPackages() {
            return this.rasci.workPackages || [];
        },
        users() {
            return this.rasci.users || [];
        },
    },
    created() {
        this.loadRasci();
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    data() {
        return {
            activeCell: null,
            activeRow: null,
            scrolled: false,
            activeElem: '',
            fixed: false,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../css/_mixins';
    @import '~theme/variables';
    @import '../../css/common';

    .rasci-matrix {
        background: $mainColor;
        padding: 0;
        margin-bottom: -60px;
        position: absolute;
        z-index: 2;
        width: calc(100% - 30px);

        &.fixed {
            position: fixed;
            top: 0;
            left: 230px;
            z-index: 2;
            width: calc(100% - 250px);
        }
    }

    .rasci-matrix + .rasci-table {
        margin-bottom: 30px;

        thead {
            visibility: hidden;
        }
    }

    .rasci-legend {
        .rasci-legend-item {
            display: flex;
            align-items: center;
            margin-right: 30px;
            margin-bottom: 15px;

            span {
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-left: 10px;
                font-size: 10px;
            }
        }
    }

    .rasci-table {
        overflow: hidden;
        position: relative;
        z-index: 1;
        table-layout: fixed;

        &.rasci-table__top {
            margin-top: 145px;
        }

        &.fixed {
            margin-top: 160px;
        }



        tr,
        th,
        td {
            position: relative;
        }

        th.rasci-cell,
        td.rasci-cell {
            vertical-align: middle;
            box-sizing: content-box;
            font-size: 0;

            .rasci-select {
                position: relative;
                z-index: 1;
                margin: 0;
                padding: 0;
            }

            .rasci-select {
                &.active {
                    z-index: 10;
                }
            }

            &:hover {               
                .rasci-select {
                    z-index: 2;
                }
            }
        }

        tbody, thead {
            th.rasci-cell.active-cell, td.rasci-cell.active-cell {
                background-color: rgba($lighterColor,.05);
                @include opacity(1);
            }
            tr.active-row {
                background-color: rgba($lighterColor,.05);
            }
        }
    }

    .task-number {
        width: 10%;
        box-sizing: content-box;
    }

    .rasci-cell {
        width: 30px;
        padding: 4px 0 0;
        text-align: center;

        &:last-child {
            padding-right: 30px
        }
    }
</style>
