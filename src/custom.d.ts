declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.css';
declare module '*.glb' {
  const src: string;
  export default src;
}
