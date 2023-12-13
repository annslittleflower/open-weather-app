type Props = {
  message: string // maybe better with children?
};

const Loading = ({ message }: Props) => (
  <div>{message}</div>
);

export default Loading;
