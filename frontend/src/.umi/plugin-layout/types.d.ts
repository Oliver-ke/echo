// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import type { ProLayoutProps } from "/Users/oliverke/work/echo/frontend/node_modules/@umijs/plugins/node_modules/@ant-design/pro-layout";
    import type InitialStateType from '@@/plugin-initialState/@@initialState';
           type InitDataType = ReturnType<typeof InitialStateType>;
        

    export type RunTimeLayoutConfig = (
      initData: InitDataType,
    ) => ProLayoutProps & {
      childrenRender?: (dom: JSX.Element, props: ProLayoutProps) => React.ReactNode,
      unAccessible?: JSX.Element,
      noFound?: JSX.Element,
    };
