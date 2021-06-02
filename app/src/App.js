import React from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
    Box,
    Button,
    GU,
    Header,
    IconMinus,
    IconPlus,
    Main,
    SyncIndicator,
    Text,
    textStyle,
} from '@aragon/ui'

function App() {
  /// useAragonApi() returns data needed by the app's contract
  const { appState } = useAragonApi()
  const { count, isSyncing } = appState

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Counter"
        secondary={
          <Text
            css={`
              ${textStyle('title2')}
            `}
          >
            {count}
          </Text>
        }
      />
      <Box
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle('title3')};
        `}
      >
        Count: {count}
      </Box>
    </Main>
  )
}

export default App