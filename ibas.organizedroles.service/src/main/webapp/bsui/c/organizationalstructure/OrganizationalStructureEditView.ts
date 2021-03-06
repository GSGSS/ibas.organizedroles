/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace organizedroles {
    export namespace ui {
        export namespace c {
            /**
             * 视图-OrganizationalStructure
             */
            export class OrganizationalStructureEditView extends ibas.BOEditView implements app.IOrganizationalStructureEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加组织-角色事件 */
                addOrganizationalRoleEvent: Function;
                /** 删除组织-角色事件 */
                removeOrganizationalRoleEvent: Function;
                /** 选则-组织角色 */
                chooseOrganizationalRoleEvent: Function;
                /** 选择-角色成员 */
                choooseRoleMemberEvent: Function;
                /** 选则-组织 */
                chooseOrganizationEvent: Function;
                /** 选则-所属组织 */
                chooseOrganizationalStructureEvent: Function;
                /** 选中-组织角色 */
                selectedOrganizationalRoleEvent: Function;
                /** 选则-经理 */
                chooseManagerEvent: Function;
                /** 添加角色-成员事件 */
                addRoleMemberEvent: Function;
                /** 删除角色-成员事件 */
                removeRoleMemberEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_organization") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseOrganizationEvent);
                                }
                            }).bindProperty("value", {
                                path: "/organization"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_belonging") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseOrganizationalStructureEvent);
                                }
                            }).bindProperty("value", {
                                path: "/belonging"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_manager") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseManagerEvent);
                                }
                            }).bindProperty("value", {
                                path: "/manager"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_validdate") }),
                            new sap.m.DatePicker("", {
                            }).bindProperty("dateValue", {
                                path: "/validDate"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_invaliddate") }),
                            new sap.m.DatePicker("", {
                            }).bindProperty("dateValue", {
                                path: "/invalidDate"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_objectkey") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/objectKey"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_objectcode") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/objectCode"
                            }),
                        ]
                    });
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_organizationalrole") }));
                    this.tableOrganizationalRole = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addOrganizationalRoleEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeOrganizationalRoleEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.OrganizationalRole>(that.tableOrganizationalRole)
                                        );
                                    }
                                })
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        // selectionMode: sap.ui.table.SelectionMode.Single,
                        visibleRowCount: 5,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_organizationalrole_role"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseOrganizationalRoleEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("value", {
                                    path: "role"
                                })
                            }),
                        ],
                        rowSelectionChange: function (): void {
                            that.fireViewEvents(that.selectedOrganizationalRoleEvent,
                                openui5.utils.getSelecteds<bo.RoleMember>(that.tableOrganizationalRole).firstOrDefault()
                            );
                        }
                    });
                    this.form.addContent(this.tableOrganizationalRole);
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_rolemember") }));
                    this.tableRoleMember = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addRoleMemberEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeRoleMemberEvent,
                                            openui5.utils.getSelecteds<bo.RoleMember>(that.tableRoleMember)
                                        );
                                    }
                                })
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: 5,
                        rows: "{/rows}",
                        columns: [
                            /*
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_rolemember_rolelineid"),
                                template: new sap.m.Text("", {
                                    width: "100%",
                                }).bindProperty("text", {
                                    path: "roleLineId"
                                })
                            }),
                            */
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_rolemember_member"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.choooseRoleMemberEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("value", {
                                    path: "member"
                                })
                            }),
                        ]
                    });
                    this.form.addContent(this.tableRoleMember);
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                /** 改变视图状态 */
                private changeViewStatus(data: bo.OrganizationalStructure): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                }
                private tableOrganizationalRole: sap.ui.table.Table;
                private tableRoleMember: sap.ui.table.Table;

                /** 显示数据 */
                showOrganizationalStructure(data: bo.OrganizationalStructure): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(data));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }
                /** 显示数据 */
                showOrganizationalRoles(datas: bo.OrganizationalRole[]): void {
                    this.tableOrganizationalRole.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableOrganizationalRole, datas);
                }
                /** 显示数据 */
                showRoleMembers(datas: bo.RoleMember[]): void {
                    this.tableRoleMember.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableRoleMember, datas);
                }
            }
        }
    }
}