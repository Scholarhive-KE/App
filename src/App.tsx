import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./routes/Navigator";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
