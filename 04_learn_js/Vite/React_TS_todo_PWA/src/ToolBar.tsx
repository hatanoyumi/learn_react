import { Box, Icon, AppBar, Toolbar, Typography, IconButton } from "@mui/material";

// // 個別に読み込んだ方がビルドが速いらしい
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// filter ステート を props として渡す
type Props = {
  filter: Filter;
  // ドロワーを開く
  onToggleDrawer: () => void;
};

// ステートを書き換える
const translator = (arg: Filter) => {
  switch (arg) {
    case 'all':
      return 'すべてのタスク';
    case 'unchecked':
      return '現在のタスク';
    case 'checked':
      return '完了したタスク';
    case 'removed':
      return 'ゴミ箱';
    default:
      return 'TODO';
  }
};

export const ToolBar = (props: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu-button"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          // ドロワーを開く
          onClick={props.onToggleDrawer}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography>{translator(props.filter)}</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);