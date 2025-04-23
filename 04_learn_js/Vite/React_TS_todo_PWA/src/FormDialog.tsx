import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

type Props = {
  text: string;
  onSubmit: () => void;
  // 追加＆変更
  dialogOpen: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleDialog: () => void;
}

export const FormDialog = (props: Props) => (
  /**
   * イベントを処理する関数定義（イベントハンドラー）には handle[Event] を、
   * それを受け取る props には on[Event] を使用するのが通例
   * handleSubmit()	→ onSubmit
   * handleChange()	→ onChange
   */
  // <form
  //   onSubmit={(e) => {
  //     e.preventDefault();
  //     props.onSubmit();
  //   }}
  // >
  //   <input type="text" value={props.text} onChange={props.onChange} />
  //   <input type="submit" value="追加" onSubmit={props.onSubmit} />
  // </form>

  // コンポーネントの変更
  <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <div style={{ margin: '1em' }}>
        <TextField
          aria-label='todo-input'
          variant='standard'
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="タスクを入力..."
          onChange={(e) => props.onChange(e)}
          value={props.text}
          autoFocus
        />
        <DialogActions>
          <Button
            aria-label='form-add'
            color='secondary'
            onClick={props.onSubmit}
          >
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);