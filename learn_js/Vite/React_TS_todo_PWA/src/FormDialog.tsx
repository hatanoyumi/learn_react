type Props = {
  text: string;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormDialog = (props: Props) => (
  /**
   * イベントを処理する関数定義（イベントハンドラー）には handle[Event] を、
   * それを受け取る props には on[Event] を使用するのが通例
   * handleSubmit()	→ onSubmit
   * handleChange()	→ onChange
   */
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    <input type="text" value={props.text} onChange={props.onChange} />
    <input type="submit" value="追加" onSubmit={props.onSubmit} />
  </form>
);