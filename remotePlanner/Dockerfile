FROM ros:humble

# Set the working directory
WORKDIR /ws

# Install ROS2 dependencies
RUN apt-get update && apt-get install -y gdb
RUN apt-get update && apt-get install -y ros-humble-octomap
RUN apt-get update && apt-get install -y ros-humble-octomap-mapping
RUN apt-get update && apt-get install -y ros-humble-octomap-msgs
RUN apt-get update && apt-get install -y ros-humble-octomap-ros
RUN apt-get update && apt-get install -y ros-humble-octomap-rviz-plugins
RUN apt-get update && apt-get install -y ros-humble-octomap-server
RUN apt-get update && apt-get install -y ros-humble-dynamic-edt-3d

RUN apt-get update && apt-get install -y \
    libeigen3-dev \
    libboost-all-dev \
    libompl-dev

RUN apt-get update && apt-get install -y \
    libwebsocketpp-dev \
    nlohmann-json3-dev

RUN apt-get update && apt-get install -y \
    python3-pip
RUN pip3 install matplotlib numpy

# Copy the source code
COPY . .

# Create a build directory
RUN mkdir -p /ws/build

# Build the code
RUN cd /ws/build && cmake .. && make

RUN chmod +x /ws/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/bin/bash", "-c", "/ws/entrypoint.sh"]