/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace organizedroles {
    export namespace app {

        /** 应用-角色 */
        export class RoleChooseApp extends ibas.BOChooseService<IRoleChooseView, bo.Role> {

            /** 应用标识 */
            static APPLICATION_ID: string = "4fbf282c-6b9b-4c95-b0de-fdd8570adb72";
            /** 应用名称 */
            static APPLICATION_NAME: string = "organizedroles_app_role_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Role.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = RoleChooseApp.APPLICATION_ID;
                this.name = RoleChooseApp.APPLICATION_NAME;
                this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryOrganizedRoles = new bo.BORepositoryOrganizedRoles();
                boRepository.fetchRole({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Role>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
                                that.busy(false);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                // 关闭自身
                this.destroy();
                // 调用编辑应用
                let app: RoleEditApp = new RoleEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-角色 */
        export interface IRoleChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Role[]): void;
        }
        /** 角色选择服务映射 */
        export class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = RoleChooseApp.APPLICATION_ID;
                this.name = RoleChooseApp.APPLICATION_NAME;
                this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Role>> {
                return new RoleChooseApp();
            }
        }
    }
}