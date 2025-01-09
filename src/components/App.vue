<template>
  <Frame>
    <Page>
      <ActionBar title="NAVigator" />
      <TabView androidTabsPosition="bottom">
        <TabViewItem title="Home" iconSource="res://home">
          <HomePage />
        </TabViewItem>
        <TabViewItem title="Search" iconSource="res://search">
          <SearchPage />
        </TabViewItem>
        <TabViewItem title="Compare" iconSource="res://compare">
          <ComparePage />
        </TabViewItem>
      </TabView>
    </Page>
  </Frame>
</template>

<script>
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import ComparePage from './pages/ComparePage.vue';

export default {
  components: {
    HomePage,
    SearchPage,
    ComparePage
  }
};
</script>