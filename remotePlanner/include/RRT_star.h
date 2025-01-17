#ifndef RRT_STAR_RRT_STAR_H
#define RRT_STAR_RRT_STAR_H

#include <iostream>
#include <vector>
#include <cmath>
#include <random>
#include <chrono>
#include <nlohmann/json.hpp>

#include "Environment.h"
#include "WebSocketServer.h"


struct Node {
    double x{}, y{}, z{};
    Node *parent{};
    double cost{};
    std::vector<Node *> children;

    double operator-(const Node &node) const {
        double dx = x - node.x;
        double dy = y - node.y;
        double dz = z - node.z;
        return std::sqrt(dx * dx + dy * dy + dz * dz);
    }
};

struct ComputedPath {
    nlohmann::json start{};
    nlohmann::json goal{};
    std::shared_ptr<std::vector<Node *>> path{};
    long time_in_microseconds{};
    double cost{};
};

struct RRTStarParameters {
    double threshold = 2.5;
    double stepLength = 1;
    double stayAway = .6;
    double safeStayAway = stayAway / cos(M_PI / 6);
    double bias = 0.2;
    int MAX_OPTIMIZING_ITERATIONS = 0 * 1000;
    int searchAtDepth = 0;
    int refreshView = -1;
    int waitBeforeClosing = 0;
};

class RRTStar {
public:
    std::shared_ptr<RRTStarParameters> parameters = std::make_shared<RRTStarParameters>();
    std::shared_ptr<Environment> env;
    Node* goalNode = nullptr;

    void getDirection(Node *node1, Node *node2, Node *direction);

    void getVersor(Node *node1, Node *node2, Node *versor);

    bool checkMultipleRayCollision(Node *node1, Node *node2);

    bool checkLinkCollisionWithDistMap(Node *node1, Node *node2);

    // pathFoundCallback with one argument
    std::shared_ptr<ComputedPath> rrtStar(nlohmann::json waypoints, std::shared_ptr<Environment> environment,
                            std::function<void(std::shared_ptr<ComputedPath>)> pathFoundCallback,
                        const std::shared_ptr<StoppableThread> &stoppableThreadPtr);

    void pathPruning(std::shared_ptr<std::vector<Node *>> &path);

    void pathSmoothing(std::shared_ptr<std::vector<Node *>> &path, float percent, int density);

private:
    double distance(Node *node1, Node *node2);

    double distance(Node *node, double x, double y);

    double randomDouble(double min, double max);

    Node *sampleRandomNode();

    Node *sampleRandomNode(Node *goal);

    Node *nearestNodeInTree(std::vector<Node *> &tree, Node *randomNode);

    std::vector<Node *> nearestNodesInTree(std::vector<Node *> &tree, Node *newNode);

    bool checkCollision(Node *node);

    bool checkCollision(Node *node1, Node *node2);

    bool checkRayCollision(Node *node1, Node *node2);

    void calcolaVerticiQuadrato(octomap::point3d *centro, octomap::point3d *versore, octomap::point3d vertici[],
                                double lato);

    void recalculateCostOfChildren(Node *node, double delta);

    Node *extendTree(Node *nearestNode, Node *randomNode, std::vector<Node *> &tree);

    Node *extend3DTree(Node *nearestNode, Node *randomNode, std::vector<Node *> &tree);

    void connectToGoal(Node *lastNode, Node *goal);

    std::vector<Node *> getPath(Node *goal);

    void visualize(const std::vector<Node *> &tree, Node *goal, bool finished = false);

};

#endif //RRT_STAR_RRT_STAR_H
