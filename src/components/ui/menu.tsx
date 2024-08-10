import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

export default function DropdownMenu() {
  <Menu>
    <MenuButton aria-label="Options" />
    <MenuList>
      <MenuItem>New Tab</MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem>Open Closed Tab</MenuItem>
      <MenuItem>Open File...</MenuItem>
    </MenuList>
  </Menu>;
}
