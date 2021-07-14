import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useCopyToClipboard } from 'react-use';
import Tooltip from '@material-ui/core/Tooltip';
import { useState } from 'react';
import { useCallback } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

const STATUS_COPY = {
  COPY: "copy",
  COPIED: "copied"
}

export const CopyToClipBoardText = ({ text }) => {
  const classes = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);
  const getTooltipTitle = () => {
    switch (statusCopy) {
      case "copy":
        return "Copy";
      case "copied":
        return "Copied";
      default:
        return "";
    }
  };
  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [copyToClipboard, text]);

  const handleClickAway = useCallback(() => {
    setStatusCopy(STATUS_COPY.COPY);
  }, [setStatusCopy]);



  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Tooltip title={getTooltipTitle()} placement="top" arrow>
        <Button
          className={classes.root}
          onClick={onClickCopy}
         
        >
          <FileCopyOutlinedIcon  color="primary" className={classes.icon} fontSize="small" />
          {text}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

CopyToClipBoardText.propTypes = {
  text: PropTypes.string.isRequired,
}
