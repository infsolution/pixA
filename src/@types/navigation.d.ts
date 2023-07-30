export type FormNavigationProps = {
  id?: string;
};

export type DetailNavigationProps = {
  id: string;
}
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Preview: undefined;
      Home: undefined;
      Form: FormNavigationProps;
      Detail: DetailNavigationProps;
    }
  }
}