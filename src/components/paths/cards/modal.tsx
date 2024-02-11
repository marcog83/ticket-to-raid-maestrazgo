export const Modal:FC<{ children:React.ReactNode }> = ({ children }) => (
  <div className={StyleSheet.modal}>
    {children}
  </div>
);
