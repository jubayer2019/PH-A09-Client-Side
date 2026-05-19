export function withAuth(Component) {
  return function AuthWrapped(props) {
    return <Component {...props} />;
  };
}
