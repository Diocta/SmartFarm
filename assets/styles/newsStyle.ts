import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#daf1de",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#daf1de",
    borderBottomWidth: 1,
    borderBottomColor: "#8EB69B50",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#051F20",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#051F20",
    opacity: 0.5,
  },
  categoriesSection: {
    backgroundColor: "#daf1de",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#8EB69B50",
  },
  chipsContainer: {
    paddingHorizontal: 15,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#8eb69b",
    opacity: 0.5,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#0B2B26",
    opacity: 1,
  },
  chipText: {
    fontSize: 14,
    color: "#051F20",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#DAF1DE",
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#0B2B26",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 24,
  },
  desc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  readTime: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});